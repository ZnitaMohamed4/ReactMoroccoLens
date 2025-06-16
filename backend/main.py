from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient
import google.generativeai as genai
import chromadb
from chromadb.config import Settings
from langdetect import detect
import logging
import asyncio
from contextlib import asynccontextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Models
class ChatMessage(BaseModel):
    message: str
    language: Optional[str] = None

class MessageResponse(BaseModel):
    response: str
    language: str
    timestamp: datetime
    session_id: str

class ChatHistory(BaseModel):
    session_id: str
    user_message: str
    bot_response: str
    language: str
    timestamp: datetime

# Global variables
mongodb_client = None
database = None
chroma_client = None
collection = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await startup_db()
    await startup_chroma()
    yield
    # Shutdown
    await shutdown_db()

app = FastAPI(
    title="Morocco Lens Chatbot API",
    description="RAG-powered chatbot for Moroccan Zellij culture",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
async def startup_db():
    global mongodb_client, database
    try:
        mongodb_client = AsyncIOMotorClient("mongodb://localhost:27017")
        database = mongodb_client.morocco_lens_chatbot
        # Test connection
        await mongodb_client.admin.command('ping')
        logger.info("Connected to MongoDB successfully")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

async def shutdown_db():
    if mongodb_client:
        mongodb_client.close()

# ChromaDB connection
async def startup_chroma():
    global chroma_client, collection
    try:
        # Configure Gemini API
        API_KEY = "AIzaSyBObtWbyz8EjVORy_s2PCeU7PPlWeJJvfM"  # Replace with your actual API key
        genai.configure(api_key=API_KEY)
        
        # Initialize ChromaDB
        chroma_client = chromadb.PersistentClient(path="./chroma_db")
        collection = chroma_client.get_or_create_collection(
            name="Zellij_Infos",
            metadata={"hnsw:space": "cosine"}
        )
        logger.info(f"Connected to ChromaDB successfully. Collection has {collection.count()} documents")
    except Exception as e:
        logger.error(f"Failed to initialize ChromaDB: {e}")
        raise

# Utility functions
def get_embeddings(texts, task_type="RETRIEVAL_DOCUMENT"):
    """Get embeddings from Gemini API"""
    if isinstance(texts, str):
        texts = [texts]
    
    embeddings = []
    for text in texts:
        try:
            result = genai.embed_content(
                model="models/embedding-001",
                content=text,
                task_type=task_type
            )
            embeddings.append(result['embedding'])
        except Exception as e:
            logger.error(f"Error getting embedding: {e}")
            raise
    
    return embeddings

def generate_response(query: str, language: str = None) -> str:
    """Enhanced RAG response generator specialized for Moroccan Zellij"""
    
    # Auto-detect language if not provided
    if not language:
        try:
            language = detect(query)
            language = language if language in ['en', 'fr', 'ar'] else 'en'
        except:
            language = 'en'
    
    # Retrieve relevant context chunks from ChromaDB
    query_embedding = get_embeddings(query, "RETRIEVAL_QUERY")[0]
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=5,
        include=["documents", "metadatas", "distances"]
    )
    
    # Build context string with source info and relevance scores
    context = "MOROCCAN ZELLIJ KNOWLEDGE BASE:\n"
    for i, (doc, meta) in enumerate(zip(results['documents'][0], results['metadatas'][0])):
        relevance = 1 - results['distances'][0][i]
        context += f"\n🔍 Source: {meta.get('source', 'unknown')} (Relevance: {relevance:.2f})\n"
        context += f"{doc}\n{'='*50}\n"
    
    # Language-specific prompt templates
    prompts = {
        'en': """As an expert on Moroccan Zellij, answer the question using these sources:
{context}
Question: {question}

Please structure your response as:
1. Summary of key information
2. Details about traditional techniques or history
3. Source citations
4. Additional cultural context if relevant

If the answer is not found in the context, answer based on your knowledge.
""",
        
        'fr': """En tant qu'expert du Zellij marocain, répondez à la question en utilisant ces sources :
{context}
Question : {question}

Veuillez structurer votre réponse comme suit :
1. Résumé des informations clés
2. Détails sur les techniques traditionnelles ou l'histoire
3. Citations des sources
4. Contexte culturel supplémentaire si pertinent

Si la réponse n'est pas dans le contexte, répondez selon vos connaissances.
""",
        
        'ar': """بصفتك خبيرًا في الزليج المغربي، أجب عن السؤال باستخدام هذه المصادر:
{context}
السؤال: {question}

يرجى هيكلة إجابتك كما يلي:
1. ملخص للمعلومات الأساسية
2. تفاصيل عن التقنيات التقليدية أو التاريخ
3. استشهاد بالمصادر
4. سياق ثقافي إضافي إذا لزم الأمر

إذا لم تجد الإجابة في السياق، يمكنك الرد بناءً على معرفتك.
"""
    }
    
    # Generate the answer with Gemini LLM
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(
        prompts[language].format(context=context, question=query),
        generation_config={
            "temperature": 0.7,
            "top_p": 0.9,
            "max_output_tokens": 2000
        },
        safety_settings={
            "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
            "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
            "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
            "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE"
        }
    )
    
    return response.text

# API Routes
@app.get("/")
async def root():
    return {"message": "Morocco Lens Chatbot API is running!"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "mongodb": "connected" if mongodb_client else "disconnected",
        "chromadb": f"connected ({collection.count()} documents)" if collection else "disconnected"
    }

@app.post("/chat", response_model=MessageResponse)
async def chat_endpoint(message: ChatMessage):
    try:
        # Generate session ID (you can implement proper session management)
        session_id = f"session_{datetime.now().timestamp()}"
        
        # Detect language if not provided
        language = message.language
        if not language:
            try:
                language = detect(message.message)
                language = language if language in ['en', 'fr', 'ar'] else 'en'
            except:
                language = 'en'
        
        # Generate response using RAG
        bot_response = generate_response(message.message, language)
        
        # Save to MongoDB
        chat_record = {
            "session_id": session_id,
            "user_message": message.message,
            "bot_response": bot_response,
            "language": language,
            "timestamp": datetime.now()
        }
        
        await database.chat_history.insert_one(chat_record)
        
        return MessageResponse(
            response=bot_response,
            language=language,
            timestamp=datetime.now(),
            session_id=session_id
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    try:
        cursor = database.chat_history.find(
            {"session_id": session_id}
        ).sort("timestamp", 1)
        
        history = []
        async for doc in cursor:
            history.append({
                "user_message": doc["user_message"],
                "bot_response": doc["bot_response"],
                "language": doc["language"],
                "timestamp": doc["timestamp"]
            })
        
        return {"session_id": session_id, "history": history}
        
    except Exception as e:
        logger.error(f"Error retrieving chat history: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/stats")
async def get_stats():
    try:
        total_chats = await database.chat_history.count_documents({})
        languages = await database.chat_history.aggregate([
            {"$group": {"_id": "$language", "count": {"$sum": 1}}}
        ]).to_list(length=None)
        
        return {
            "total_conversations": total_chats,
            "language_distribution": {lang["_id"]: lang["count"] for lang in languages},
            "knowledge_base_documents": collection.count() if collection else 0
        }
        
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)