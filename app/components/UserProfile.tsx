'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="position-relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        className="btn d-flex align-items-center gap-2 p-0"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          borderRadius: '50px',
          padding: '4px'
        }}
      >
        <div 
          className="d-flex align-items-center gap-2"
          style={{
            background: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid #4f46e5',
            borderRadius: '50px',
            padding: '8px 16px'
          }}
        >
          {/* Avatar */}
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '32px',
              height: '32px',
              background: user.picture 
                ? `url(${user.picture})` 
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '50%',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            {!user.picture && initials}
          </div>
          
          {/* User Name */}
          <span 
            className="d-none d-md-inline"
            style={{ 
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: '500',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {user.name.split(' ')[0]}
          </span>
          
          {/* Dropdown Arrow */}
          <i 
            className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}
            style={{
              color: '#9ca3af',
              fontSize: '0.75rem',
              transition: 'transform 0.2s ease'
            }}
          ></i>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="position-absolute"
          style={{
            top: '100%',
            right: 0,
            marginTop: '8px',
            minWidth: '280px',
            backgroundColor: '#1e2936',
            border: '1px solid #2a3441',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Profile Header */}
          <div 
            className="p-4 border-bottom"
            style={{ borderColor: '#2a3441' }}
          >
            <div className="d-flex align-items-center gap-3">
              {/* Large Avatar */}
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '48px',
                  height: '48px',
                  background: user.picture 
                    ? `url(${user.picture})` 
                    : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '50%',
                  color: '#ffffff',
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}
              >
                {!user.picture && initials}
              </div>
              
              <div>
                <div 
                  className="fw-semibold"
                  style={{ 
                    color: '#ffffff',
                    fontSize: '1rem',
                    lineHeight: '1.2'
                  }}
                >
                  {user.name}
                </div>
                <div 
                  style={{ 
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }}
                >
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              className="btn w-100 d-flex align-items-center gap-3 text-start"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#e8e8e8',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2a3441';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className="bi bi-person" style={{ fontSize: '1rem' }}></i>
              <span>View Profile</span>
            </button>

            <button
              className="btn w-100 d-flex align-items-center gap-3 text-start"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#e8e8e8',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2a3441';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className="bi bi-gear" style={{ fontSize: '1rem' }}></i>
              <span>Settings</span>
            </button>

            <button
              className="btn w-100 d-flex align-items-center gap-3 text-start"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#e8e8e8',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2a3441';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className="bi bi-chat-left-text" style={{ fontSize: '1rem' }}></i>
              <span>Chat History</span>
            </button>

            <hr style={{ 
              border: 'none', 
              borderTop: '1px solid #2a3441',
              margin: '8px 0' 
            }} />

            <button
              className="btn w-100 d-flex align-items-center gap-3 text-start"
              onClick={logout}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ff6b6b',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className="bi bi-box-arrow-right" style={{ fontSize: '1rem' }}></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Add CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
