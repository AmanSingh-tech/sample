'use client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'} mb-4`} data-testid="message-bubble">
      <div 
        className="rounded-3 p-4"
        data-testid={`message-content-${isUser ? 'user' : 'assistant'}`}
        style={{ 
          maxWidth: '75%',
          backgroundColor: isUser ? '#4f46e5' : '#1e2936',
          border: isUser ? 'none' : '1px solid #2a3441',
          background: isUser ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#1e2936'
        }}
      >
        {!isUser && (
          <div className="d-flex align-items-center mb-3">
            <div 
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '8px'
              }}
            >
              <i className="bi bi-robot text-white" style={{ fontSize: '1rem' }}></i>
            </div>
            <span style={{ 
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              ChatGPT Clone
            </span>
          </div>
        )}
        
        <div 
          style={{ 
            color: '#ffffff',
            fontSize: '1rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}
        >
          {message.content}
        </div>
        
        <small 
          style={{ 
            color: isUser ? '#e0e7ff' : '#9ca3af',
            fontSize: '0.75rem',
            marginTop: '8px',
            display: 'block'
          }}
        >
          {message.timestamp.toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
}
