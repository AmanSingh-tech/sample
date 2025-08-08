import { render, screen } from '@testing-library/react';
import MessageBubble from '../../app/components/MessageBubble';

describe('MessageBubble', () => {
  const mockMessage = {
    id: '1',
    role: 'user' as const,
    content: 'Hello, this is a test message',
    timestamp: new Date('2023-01-01T15:30:00Z'),
  };

  it('renders user message correctly', () => {
    render(<MessageBubble message={mockMessage} />);
    
    expect(screen.getByText('Hello, this is a test message')).toBeInTheDocument();
    expect(screen.getByText(/PM/)).toBeInTheDocument();
  });

  it('renders assistant message correctly', () => {
    const assistantMessage = {
      ...mockMessage,
      role: 'assistant' as const,
    };

    render(<MessageBubble message={assistantMessage} />);
    
    expect(screen.getByText('Hello, this is a test message')).toBeInTheDocument();
    expect(screen.getByText('ChatGPT Clone')).toBeInTheDocument();
  });

  it('applies correct styling for user messages', () => {
    render(<MessageBubble message={mockMessage} />);
    
    const messageContainer = screen.getByTestId('message-content-user');
    expect(messageContainer).toHaveStyle('background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)');
  });

  it('applies correct styling for assistant messages', () => {
    const assistantMessage = {
      ...mockMessage,
      role: 'assistant' as const,
    };

    render(<MessageBubble message={assistantMessage} />);
    
    const messageContainer = screen.getByTestId('message-content-assistant');
    expect(messageContainer).toHaveStyle('background-color: #1e2936');
  });

  it('shows robot icon for assistant messages', () => {
    const assistantMessage = {
      ...mockMessage,
      role: 'assistant' as const,
    };

    render(<MessageBubble message={assistantMessage} />);
    
    const robotIcon = screen.getByText('ChatGPT Clone').parentElement?.querySelector('.bi-robot');
    expect(robotIcon).toBeInTheDocument();
  });

  it('aligns user messages to the right', () => {
    render(<MessageBubble message={mockMessage} />);
    
    const outerContainer = screen.getByTestId('message-bubble');
    expect(outerContainer).toHaveClass('justify-content-end');
  });

  it('aligns assistant messages to the left', () => {
    const assistantMessage = {
      ...mockMessage,
      role: 'assistant' as const,
    };

    render(<MessageBubble message={assistantMessage} />);
    
    const outerContainer = screen.getByTestId('message-bubble');
    expect(outerContainer).toHaveClass('justify-content-start');
  });
});
