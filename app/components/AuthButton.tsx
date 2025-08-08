'use client';

import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';

export default function AuthButton() {
  const { user, login, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center"
        style={{ width: '100px', height: '40px' }}
      >
        <div 
          className="spinner-border spinner-border-sm"
          style={{ color: '#4f46e5' }}
        ></div>
      </div>
    );
  }

  if (user) {
    return <UserProfile />;
  }

  return (
    <button 
      className="btn d-flex align-items-center gap-2"
      onClick={login}
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        border: 'none',
        color: '#ffffff',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <i className="bi bi-person-plus"></i>
      Sign In
    </button>
  );
}
