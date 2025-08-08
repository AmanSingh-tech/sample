'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, just redirect back to home
      // In a real app, this would authenticate with Auth0
      router.push('/');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // In a real app, this would redirect to Auth0 Google OAuth
    // For now, just redirect back to home
    router.push('/');
  };

  const handleGithubLogin = () => {
    // In a real app, this would redirect to Auth0 GitHub OAuth
    // For now, just redirect back to home
    router.push('/');
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#0f1419',
        backgroundImage: 'radial-gradient(ellipse at center, rgba(79, 70, 229, 0.1) 0%, transparent 50%)'
      }}
    >
      <div 
        className="card shadow-lg"
        style={{
          backgroundColor: '#1e2936',
          border: '1px solid #2a3441',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '400px',
          margin: '20px'
        }}
      >
        <div className="card-body p-5">
          {/* Header */}
          <div className="text-center mb-4">
            <div 
              className="d-flex align-items-center justify-content-center mb-3"
              style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '16px',
                margin: '0 auto'
              }}
            >
              <i className="bi bi-chat-dots text-white" style={{ fontSize: '1.5rem' }}></i>
            </div>
            <h2 
              className="mb-2"
              style={{ 
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '1.75rem'
              }}
            >
              Welcome Back
            </h2>
            <p 
              className="mb-0"
              style={{ 
                color: '#9ca3af',
                fontSize: '1rem'
              }}
            >
              Sign in to your ChatGPT Clone account
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="d-grid gap-3 mb-4">
            <button
              type="button"
              className="btn d-flex align-items-center justify-content-center gap-3"
              onClick={handleGoogleLogin}
              style={{
                backgroundColor: '#2a3441',
                border: '1px solid #374151',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#2a3441';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              className="btn d-flex align-items-center justify-content-center gap-3"
              onClick={handleGithubLogin}
              style={{
                backgroundColor: '#2a3441',
                border: '1px solid #374151',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#2a3441';
              }}
            >
              <i className="bi bi-github" style={{ fontSize: '1.25rem' }}></i>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center mb-4">
            <hr style={{ 
              flex: 1, 
              border: 'none', 
              borderTop: '1px solid #374151',
              margin: 0 
            }} />
            <span 
              className="px-3"
              style={{ 
                color: '#9ca3af',
                fontSize: '0.875rem'
              }}
            >
              Or continue with email
            </span>
            <hr style={{ 
              flex: 1, 
              border: 'none', 
              borderTop: '1px solid #374151',
              margin: 0 
            }} />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label 
                htmlFor="email" 
                className="form-label"
                style={{ 
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                style={{
                  backgroundColor: '#0f1419',
                  borderColor: '#374151',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div className="mb-4">
              <label 
                htmlFor="password" 
                className="form-label"
                style={{ 
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                style={{
                  backgroundColor: '#0f1419',
                  borderColor: '#374151',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div className="d-grid mb-4">
              <button
                type="submit"
                className="btn"
                disabled={isLoading || !email || !password}
                style={{
                  background: (!email || !password || isLoading)
                    ? '#374151'
                    : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p 
              className="mb-2"
              style={{ 
                color: '#9ca3af',
                fontSize: '0.875rem'
              }}
            >
              Don't have an account?
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would go to signup
                  router.push('/');
                }}
                style={{ 
                  color: '#4f46e5',
                  textDecoration: 'none',
                  marginLeft: '4px'
                }}
              >
                Sign up
              </a>
            </p>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => router.push('/')}
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                padding: 0,
                border: 'none'
              }}
            >
              ← Back to Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
