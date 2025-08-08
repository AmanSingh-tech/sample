'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatInterface from './components/ChatInterface';
import AuthButton from './components/AuthButton';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { api } from '~/utils/api';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const { setUser } = useAuth();

  useEffect(() => {
    if (!searchParams) return;
    
    const login = searchParams.get('login');
    const error = searchParams.get('error');
    const userData = searchParams.get('user');
    
    if (login === 'success') {
      // If user data is provided, store it
      if (userData) {
        try {
          const user = JSON.parse(decodeURIComponent(userData));
          setUser(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      // Clear the URL parameters immediately without showing success message
      router.replace('/');
    } else if (error) {
      setLoginStatus(`Login error: ${error}`);
      // Clear the URL parameter after 5 seconds
      setTimeout(() => {
        router.replace('/');
        setLoginStatus(null);
      }, 5000);
    }
  }, [searchParams, router, setUser]);

  return (
    <main className="h-100" style={{ backgroundColor: '#0f1419' }}>
      <div className="d-flex flex-column h-100">
        {/* Login Status Banner */}
        {loginStatus && (
          <div 
            className="alert d-flex align-items-center justify-content-between m-0"
            style={{
              backgroundColor: loginStatus.includes('error') ? '#2d1b1b' : '#1b2d1b',
              borderColor: loginStatus.includes('error') ? '#4a2c2c' : '#2c4a2c',
              color: loginStatus.includes('error') ? '#ff6b6b' : '#4ade80',
              borderRadius: 0,
              border: 'none',
              borderBottom: `1px solid ${loginStatus.includes('error') ? '#4a2c2c' : '#2c4a2c'}`,
              padding: '12px 16px'
            }}
          >
            <span>{loginStatus}</span>
            <button
              className="btn-close"
              onClick={() => setLoginStatus(null)}
              style={{ filter: 'invert(1)', opacity: 0.7 }}
            ></button>
          </div>
        )}
        
        {/* Fixed Header with Auth */}
        <div 
          className="position-fixed top-0 w-100 border-bottom p-3 d-flex justify-content-between align-items-center"
          style={{ 
            borderColor: '#2a3441',
            backgroundColor: '#0f1419',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
            >
              <i className="bi bi-chat-dots text-white" style={{ fontSize: '1.1rem' }}></i>
            </div>
            <h4 className="mb-0 fw-bold" style={{ 
              color: '#ffffff',
              fontSize: '1.3rem',
              letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ChatGPT Clone
            </h4>
          </div>
          <AuthButton />
        </div>
        
        {/* Desktop Sidebar - Always visible on desktop */}
        <div className="d-none d-md-block">
          <Sidebar onClose={() => {}} />
        </div>
        
        {/* Chat Interface */}
        <div className="flex-grow-1 d-flex flex-column">
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}

function Home() {
  return (
    <AuthProvider>
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ 
          height: '100vh', 
          backgroundColor: '#0f1419',
          color: '#ffffff' 
        }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading ChatGPT Clone...</p>
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </AuthProvider>
  );
}

export default api.withTRPC(Home);