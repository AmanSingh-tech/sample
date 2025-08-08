'use client';

import { useState, useRef, useEffect } from 'react';
import { api } from '~/utils/api';
import MessageBubble from './MessageBubble';
import Sidebar from './Sidebar';
import ImageGenerator from './ImageGenerator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = api.chat.sendMessage.useMutation({
    onSuccess: (response) => {
      const assistantMessage: Message = {
        id: response.id,
        role: 'assistant' as const,
        content: response.content,
        timestamp: new Date(response.timestamp),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const messageToSend = inputMessage.trim(); // Store the message before clearing

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputMessage(''); // Clear input immediately for better UX

    try {
      console.log('Sending message:', messageToSend); // Debug log
      // Call with the correct object format
      const result = await sendMessageMutation.mutateAsync({
        message: messageToSend,
      });
      console.log('Received result:', result); // Debug log
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div 
      className="d-flex position-relative" 
      style={{ 
        backgroundColor: '#0f1419',
        height: '100vh', // Full viewport height
        paddingTop: '73px', // Account for fixed navbar
        paddingLeft: '0' // Mobile first
      }}
    >
      {/* Sidebar - only for mobile overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed h-100 d-md-none"
          style={{ 
            width: '280px',
            zIndex: 1000,
            left: '0',
            top: '73px', // Start below navbar
            height: 'calc(100vh - 73px)',
            transition: 'left 0.3s ease'
          }}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 d-md-none"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            left: 0,
            top: '73px',
            height: 'calc(100vh - 73px)'
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div 
        className="d-flex flex-column w-100 chat-main-area position-relative"
        style={{
          height: 'calc(100vh - 73px)' // Full height minus navbar
        }}
      >
        {/* Chat Header */}
        <div 
          className="d-flex align-items-center justify-content-between p-3 border-bottom d-md-none"
          style={{ borderColor: '#2a3441' }}
        >
          <button 
            className="btn btn-sm"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'transparent',
              border: '1px solid #2a3441',
              color: '#e8e8e8',
              borderRadius: '8px'
            }}
          >
            <i className="bi bi-chat-dots"></i>
          </button>
          <h6 className="mb-0" style={{ color: '#ffffff' }}>Chat</h6>
          <button 
            className="btn btn-sm"
            onClick={() => setShowImageGenerator(true)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '8px',
              width: '40px',
              height: '32px'
            }}
          >
            <i className="bi bi-image" style={{ fontSize: '0.9rem' }}></i>
          </button>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-grow-1 overflow-auto p-4"
          style={{ 
            backgroundColor: '#0f1419',
            paddingBottom: '100px' // Add space for fixed input area
          }}
        >
          {messages.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
              <div 
                className="mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  borderRadius: '20px'
                }}
              >
                <i className="bi bi-chat-dots text-white" style={{ fontSize: '2rem' }}></i>
              </div>
              <h3 className="mb-3" style={{ 
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '2rem',
                letterSpacing: '-0.025em'
              }}>
                How can I help you today?
              </h3>
              <p style={{ 
                color: '#9ca3af',
                fontSize: '1.1rem',
                maxWidth: '600px',
                lineHeight: '1.6'
              }}>
                I'm an AI assistant powered by advanced language models. Start a conversation and I'll do my best to help you with questions, creative tasks, analysis, and more.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="d-flex justify-content-start">
                  <div 
                    className="p-4 rounded-3"
                    style={{
                      backgroundColor: '#1e2936',
                      maxWidth: '70%',
                      border: '1px solid #2a3441'
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="spinner-grow spinner-grow-sm" style={{ color: '#4f46e5' }}></div>
                      <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div 
          className="position-fixed bottom-0 w-100 border-top"
          style={{ 
            borderColor: '#2a3441',
            backgroundColor: '#0f1419',
            padding: '16px',
            zIndex: 100,
            left: '0'
          }}
        >
          <div className="container-fluid px-3 px-md-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="d-flex gap-3 align-items-end">
            <div className="flex-grow-1">
              <textarea
                className="form-control"
                rows={1}
                placeholder="Message ChatGPT Clone..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                style={{ 
                  resize: 'none',
                  backgroundColor: '#1e2936',
                  borderColor: '#2a3441',
                  color: '#ffffff',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  minHeight: '48px'
                }}
              />
            </div>
            <button
              className="btn d-flex align-items-center justify-content-center"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              style={{
                background: inputMessage.trim() ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#2a3441',
                border: 'none',
                borderRadius: '12px',
                width: '48px',
                height: '48px',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              {isLoading ? (
                <div className="spinner-grow spinner-grow-sm" style={{ width: '16px', height: '16px' }}></div>
              ) : (
                <i className="bi bi-arrow-up" style={{ fontSize: '1.25rem' }}></i>
              )}
            </button>
          </div>
          </div>
        </div>
      </div>
      
      {/* Image Generator Modal */}
      {showImageGenerator && (
        <ImageGenerator onClose={() => setShowImageGenerator(false)} />
      )}
    </div>
  );
}
