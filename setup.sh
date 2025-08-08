#!/bin/bash

# Development setup script for ChatGPT Clone
# This script helps set up the development environment quickly

set -e

echo "🚀 Setting up ChatGPT Clone development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📋 Creating .env.local from template..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your actual API keys and configuration"
else
    echo "✅ .env.local already exists"
fi

# Run tests to ensure everything is working
echo "🧪 Running tests..."
npm test -- --passWithNoTests

# Build the project to check for errors
echo "🏗️  Building project..."
npm run build

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys:"
echo "   - Auth0 credentials"
echo "   - Supabase URL and key"
echo "   - Google Gemini API key"
echo "   - Hugging Face API key"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Read DEVELOPMENT.md for detailed setup instructions"
