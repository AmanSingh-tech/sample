// Fallback responses for when the AI API is unavailable
export const fallbackResponses = {
  greeting: [
    "Hello! I'm currently running in offline mode, but I'm happy to help with general questions.",
    "Hi there! While my AI capabilities are temporarily limited, I can still assist you.",
    "Welcome! I'm in demo mode right now, but feel free to ask me anything.",
  ],
  
  help: [
    "I can help with general programming questions, explain concepts, or provide guidance on common topics.",
    "While my AI is temporarily unavailable, I can still offer assistance with basic queries and information.",
    "I'm here to help! Even in demo mode, I can provide useful information and guidance.",
  ],
  
  programming: [
    "For programming questions, I recommend checking the official documentation or community resources like Stack Overflow.",
    "Common programming concepts I can discuss include variables, functions, loops, and data structures.",
    "Popular programming languages include JavaScript, Python, Java, C++, and many others, each with their own strengths.",
  ],
  
  general: [
    "That's an interesting question! While I'm in demo mode, I'd recommend checking reliable sources for detailed information.",
    "I appreciate your question. For the most accurate and up-to-date information, please consult authoritative sources.",
    "Thank you for asking! While my AI capabilities are limited right now, I encourage you to explore this topic further.",
  ],
};

export function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return getRandomResponse(fallbackResponses.greeting);
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return getRandomResponse(fallbackResponses.help);
  }
  
  if (lowerMessage.includes('code') || lowerMessage.includes('program') || lowerMessage.includes('javascript') || lowerMessage.includes('python') || lowerMessage.includes('function')) {
    return getRandomResponse(fallbackResponses.programming);
  }
  
  return getRandomResponse(fallbackResponses.general);
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function createQuotaExceededResponse(): string {
  return `I've reached my daily API quota limit for the Google Gemini service. The quota resets every 24 hours.

Here are your options:
1. **Wait**: The free quota will reset tomorrow
2. **Upgrade**: Get a paid Google Cloud account for higher limits
3. **Alternative**: I can still provide helpful responses in demo mode

Feel free to continue chatting - I'll do my best to help with the resources available!`;
}
