'use client';

import { useState } from 'react';
import ImageGenerator from './ImageGenerator';

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [showImageGenerator, setShowImageGenerator] = useState(false);

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-md-none"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1040,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />
      
      <div 
        className="position-fixed start-0 h-100 d-flex flex-column"
        style={{ 
          top: '73px', // Start below the navbar
          height: 'calc(100vh - 73px)', // Adjust height to account for navbar
          width: '280px',
          background: 'linear-gradient(180deg, #0a0e13 0%, #0f1419 100%)',
          color: '#e8e8e8',
          borderRight: '1px solid rgba(42, 52, 65, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
          zIndex: 1050,
          transform: 'translateX(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Decorative gradient overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100"
          style={{
            height: '120px',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
            zIndex: 0
          }}
        />
        
        {/* Close button for mobile */}
        <div className="d-flex justify-content-end p-3 d-md-none position-relative" style={{ zIndex: 1 }}>
          <button
            className="btn btn-sm"
            onClick={onClose}
            style={{ 
              background: 'rgba(42, 52, 65, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#e8e8e8',
              borderRadius: '12px',
              width: '40px',
              height: '40px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.4)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(42, 52, 65, 0.8)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <i className="bi bi-x fs-5"></i>
          </button>
        </div>
        
        {/* New Chat Button */}
        <div className="px-4 pb-3 position-relative" style={{ zIndex: 1 }}>
          <button 
            className="btn w-100 d-flex align-items-center justify-content-center gap-3 position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
              border: 'none',
              color: 'white',
              borderRadius: '16px',
              padding: '14px 18px',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(79, 70, 229, 0.3)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.3)';
            }}
          >
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                pointerEvents: 'none'
              }}
            />
            <i className="bi bi-plus-lg" style={{ fontSize: '1rem' }}></i>
            <span>New conversation</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-3 position-relative" style={{ zIndex: 1 }}>
          <div className="d-grid gap-2">
            <button 
              className="btn d-flex align-items-center gap-3 position-relative"
              onClick={() => setShowImageGenerator(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e8e8e8',
                borderRadius: '12px',
                padding: '10px 14px',
                fontSize: '0.85rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.3)';
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(79, 70, 229, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div 
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '6px',
                  boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                }}
              >
                <i className="bi bi-image text-white" style={{ fontSize: '0.8rem' }}></i>
              </div>
              <span>Generate Image</span>
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-grow-1 overflow-auto px-3 position-relative" style={{ zIndex: 1 }}>
          {conversations.length === 0 ? (
            <div className="p-3 text-center">
              <div 
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                  borderRadius: '16px',
                  margin: '0 auto',
                  border: '1px solid rgba(79, 70, 229, 0.2)'
                }}
              >
                <i className="bi bi-chat-text" style={{ fontSize: '1.2rem', color: '#4f46e5' }}></i>
              </div>
              <p className="mb-2 fw-semibold" style={{ color: '#ffffff', fontSize: '0.85rem' }}>
                No conversations yet
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem', lineHeight: '1.4' }}>
                Start a new conversation to see your chat history appear here
              </p>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {conversations.map((conversation, index) => (
                <button
                  key={index}
                  className="list-group-item list-group-item-action border-0 mb-2 position-relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#e8e8e8',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.2)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(79, 70, 229, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center position-relative">
                    <span className="text-truncate fw-medium" style={{ fontSize: '0.8rem' }}>
                      {conversation.title}
                    </span>
                    <small style={{ 
                      color: '#9ca3af', 
                      fontSize: '0.7rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {conversation.time}
                    </small>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Generator Modal */}
      {showImageGenerator && (
        <ImageGenerator onClose={() => setShowImageGenerator(false)} />
      )}
    </>
  );
}
