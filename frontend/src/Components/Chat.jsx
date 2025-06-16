import React, { useState, useRef, useEffect } from "react";
import { marRobot } from "../assets";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with Moroccan culture today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Configuration
  const API_BASE_URL = "http://localhost:8000"; // Change this to your backend URL

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // API call to send message
  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          language: null // Auto-detect language
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const newMessage = { from: "user", text: userMessage };
    
    // Add user message immediately
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);
    
    try {
      // Send message to API
      const response = await sendMessageToAPI(userMessage);
      
      // Update session ID if this is the first message
      if (!sessionId) {
        setSessionId(response.session_id);
      }
      
      // Add bot response
      setMessages(prev => [
        ...prev,
        { 
          from: "bot", 
          text: response.response,
          language: response.language,
          timestamp: response.timestamp
        }
      ]);
      
    } catch (error) {
      console.error('Failed to get response:', error);
      setError('Sorry, I encountered an error. Please try again.');
      
      // Add error message
      setMessages(prev => [
        ...prev,
        { 
          from: "bot", 
          text: "Sorry, I'm having trouble connecting right now. Please check if the server is running and try again.",
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Load chat history (optional feature)
  const loadChatHistory = async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        const historyMessages = [];
        
        data.history.forEach(item => {
          historyMessages.push({ from: "user", text: item.user_message });
          historyMessages.push({ from: "bot", text: item.bot_response });
        });
        
        setMessages(prev => [...prev, ...historyMessages]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3 max-w-16">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );

  const ConnectionStatus = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
      const checkConnection = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/health`);
          setIsOnline(response.ok);
        } catch {
          setIsOnline(false);
        }
      };

      checkConnection();
      const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
      
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
        isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
      }`} title={isOnline ? 'Connected' : 'Disconnected'} />
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!open && (
        <button
          className="group relative bg-gradient-to-br from-amber-600 via-orange-700 to-red-800 text-white rounded-full p-4 shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <div className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
            💬
          </div>
          <ConnectionStatus />
        </button>
      )}
      
      {/* Chat Window */}
      {open && (
        <div className={`bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col animate-in slide-in-from-bottom-4 duration-300 transition-all ${
          isExpanded ? 'w-96 h-[500px]' : 'w-80 h-96'
        }`}>
          {/* Header */}
          <div className="relative bg-gradient-to-r from-amber-600 via-orange-700 to-red-800 p-4 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden relative">
                  <img 
                    src={marRobot} 
                    alt="AI Assistant" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7C5.9 7 5 7.9 5 9V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V9H21ZM8 12C8.6 12 9 11.6 9 11S8.6 10 8 10 7 10.4 7 11 7.4 12 8 12ZM16 12C16.6 12 17 11.6 17 11S16.6 10 16 10 15 10.4 15 11 15.4 12 16 12ZM12 17.5C10.67 17.5 9.69 16.5 10.26 15.5H13.74C14.31 16.5 13.33 17.5 12 17.5Z"/>
                    </svg>
                  </div>
                  <ConnectionStatus />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Morocco Lens Assistant</h3>
                  <p className="text-white/80 text-xs">
                    {sessionId ? `Session: ${sessionId.slice(-8)}` : 'Always here to help'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 z-10 relative"
                  aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    {isExpanded ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    )}
                  </svg>
                </button>
                <button 
                  onClick={() => setOpen(false)} 
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 z-10 relative"
                  aria-label="Close chatbot"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 transform -skew-x-12"></div>
          </div>
          
          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 m-2 rounded">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-lg ${
                    msg.from === "bot"
                      ? msg.isError 
                        ? "bg-red-50 text-red-800 rounded-bl-md border border-red-200 shadow-red-200/50"
                        : "bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-gray-200/50"
                      : "bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-br-md shadow-amber-500/30"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.from === "bot" && !msg.isError && (
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">
                          AI Assistant {msg.language && `(${msg.language.toUpperCase()})`}
                        </span>
                      </div>
                      {msg.timestamp && (
                        <span className="text-xs text-gray-400">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white rounded-2xl rounded-bl-md border border-gray-100 shadow-lg shadow-gray-200/50">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-white/80 backdrop-blur-sm border-t border-gray-100 rounded-b-2xl">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200 placeholder-gray-500"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Ask about Moroccan culture..."
                  disabled={isTyping}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400 text-xs">✨</span>
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:from-amber-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-amber-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
              >
                {isTyping ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;