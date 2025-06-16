#!/bin/bash

# Morocco Lens Chatbot Docker Setup Script
echo "🏛️ Setting up Morocco Lens Chatbot with Docker..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p chroma_db
mkdir -p logs
mkdir -p data

# Set permissions
chmod 755 chroma_db
chmod 755 logs
chmod 755 data

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env 2>/dev/null || cat > .env << EOF
# Environment variables for Docker Compose
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Configuration
MONGODB_USERNAME=admin
MONGODB_PASSWORD=password123
MONGODB_DATABASE=morocco_lens_chatbot

# Application Configuration
ENVIRONMENT=production
LOG_LEVEL=INFO
EOF
    echo "📝 Please edit .env file and add your GEMINI_API_KEY"
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and start services
echo "🏗️  Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

# Test API health
echo "🏥 Testing API health..."
sleep 5
curl -f http://localhost:8000/health || echo "⚠️  API health check failed - services might still be starting"

echo "✅ Setup complete!"
echo ""
echo "🌐 Services available at:"
echo "   - API: http://localhost:8000"
echo "   - API Documentation: http://localhost:8000/docs"
echo "   - MongoDB Express: http://localhost:8081 (admin/admin123)"
echo "   - Health Check: http://localhost:8000/health"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop services: docker-compose down"
echo "   - Restart services: docker-compose restart"
echo "   - View running containers: docker-compose ps"
echo ""
echo "⚠️  Remember to:"
echo "   1. Update your GEMINI_API_KEY in the .env file"
echo "   2. Populate your ChromaDB with Zellij documents"
echo "   3. Configure CORS origins for production use"