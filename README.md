# ChatGPT Clone - Mobile-First

A mobile-first ChatGPT clone built with Next.js App Router, tRPC, Bootstrap, Supabase, and Google's Gemini AI.

## 🚀 Features

- **Mobile-First Design**: Responsive UI optimized for mobile devices
- **Real-time Chat**: Chat with AI using Google's Gemini API
- **AI Image Generation**: Generate actual images using Hugging Face AI models
  - FLUX.1-dev (recommended)
  - Stable Diffusion 2.1
  - DALL-E Mini (Craiyon)
- **Authentication**: User authentication with Auth0
- **Persistent Storage**: Chat history stored in Supabase
- **Modern Stack**: Built with Next.js 15, tRPC, and TypeScript
- **Testing**: Unit tests with Jest and React Testing Library

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Bootstrap 5, Bootstrap Icons
- **API**: tRPC for type-safe APIs
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Auth0
- **AI Services**: 
  - Google Gemini API (chat responses)
  - Hugging Face Inference API (image generation)
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## 📱 Mobile-First Approach

This application is designed with mobile users in mind:

- Responsive sidebar that collapses on mobile
- Touch-friendly interface elements
- Optimized for various screen sizes
- Fast loading and smooth animations

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Auth0 account
- Google AI API key
- Hugging Face account (for image generation)

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='your_auth0_client_id'
AUTH0_CLIENT_SECRET='your_auth0_client_secret'

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL='your_supabase_project_url'
NEXT_PUBLIC_SUPABASE_ANON_KEY='your_supabase_anon_key'

# Google Gemini API Configuration
GOOGLE_GEMINI_API_KEY='your_google_gemini_api_key'

# Hugging Face API Configuration (for image generation)
HUGGINGFACE_API_KEY='your_huggingface_api_key'
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatgpt-clone
   ```

2. **Quick setup (recommended)**
   ```bash
   ./setup.sh
   ```

3. **Manual setup**
   ```bash
   # Install dependencies
   npm install
   
   # Copy environment variables
   cp .env.example .env.local
   # Edit .env.local with your actual values
   
   # Run tests
   npm test
   
   # Build project
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

## 🔧 Development

```bash
# Start development server with Turbopack (faster)
npm run dev

# Start development server (standard)
npm run dev:normal

# Build for production
npm run build

# Start production server
npm start

# Clean build artifacts
npm run clean
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically via GitHub integration**

```bash
# Or deploy via CLI
npx vercel --prod
```

### Deploy with Docker

```bash
# Build and run locally
docker build -t chatgpt-clone .
docker run -p 3000:3000 --env-file .env.local chatgpt-clone

# Deploy to any Docker-compatible platform
```

### Deploy to Other Platforms

The application is compatible with:
- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **Render**
- **DigitalOcean App Platform**
- **AWS Amplify**
- **Google Cloud Run**

## 🎯 Current Status

✅ **Production Ready:**
- ✅ Complete project structure with Next.js 15 & App Router
- ✅ tRPC setup for type-safe APIs with working chat functionality
- ✅ Bootstrap UI integration with modern Terminal-inspired design
- ✅ Mobile-first responsive design with fixed navbar/sidebar
- ✅ Chat interface with real AI responses (Google Gemini)
- ✅ Image generation with Hugging Face AI models
- ✅ Auth0 authentication with user profiles
- ✅ Complete testing setup with Jest and React Testing Library
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Docker containerization
- ✅ Vercel deployment configuration
- ✅ Development environment setup scripts

� **Ready for Production:**
- All core features implemented and functional
- Comprehensive documentation
- Security best practices implemented
- Performance optimized for mobile devices
- Full test coverage for critical components

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

```bash
# Fork and clone the repo
git clone https://github.com/your-username/chatgpt-clone.git
cd chatgpt-clone

# Set up development environment
./setup.sh

# Create a feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run test
npm run lint
npm run build

# Commit and push
git commit -m "feat: your feature description"
git push origin feature/your-feature
```

## 📋 Project Documentation

- [Development Guide](DEVELOPMENT.md) - Detailed setup and development instructions
- [Contributing Guide](CONTRIBUTING.md) - How to contribute to the project
- [Security Policy](SECURITY.md) - Security guidelines and reporting
- [API Documentation](docs/api.md) - API endpoints and usage

## 🔒 Security

Please review our [Security Policy](SECURITY.md) and report security vulnerabilities responsibly.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Ready for Production! 🚀**

This ChatGPT clone is fully functional and production-ready with:
- 🤖 Real AI chat responses
- 🎨 AI image generation  
- 🔐 Complete user authentication
- 📱 Mobile-first responsive design
- 🧪 Comprehensive testing
- 🚀 Easy deployment options
