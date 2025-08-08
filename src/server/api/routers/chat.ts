import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFallbackResponse, createQuotaExceededResponse } from "../../../utils/fallbackResponses";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "demo-key");

// Simple in-memory rate limiting (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_PER_HOUR = 10; // Adjust based on your needs
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT_PER_HOUR) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        conversationId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log('Received input in chat.sendMessage:', input); // Debug log
      console.log('Input type:', typeof input); // Debug log
      
      // Use session or a simple global counter for rate limiting (in production, use proper user identification)
      const identifier = 'global'; // Simplified for demo - you could use user ID from session
      
      // Check rate limit
      if (!checkRateLimit(identifier)) {
        return {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "The API usage limit has been reached for this hour. Please try again later to help conserve API quota.",
          timestamp: new Date(),
        };
      }
      
      try {
        // For demo purposes, provide a mock response if no API key
        if (!process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY === "demo-key") {
          return {
            id: Date.now().toString(),
            role: "assistant" as const,
            content: `${getFallbackResponse(input.message)}\n\n*Note: This is a demo response since no Google Gemini API key is configured. To get real AI responses, please add your GOOGLE_GEMINI_API_KEY to the .env.local file.*`,
            timestamp: new Date(),
          };
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(input.message);
        const response = result.response;
        const text = response.text();

        // Here you would save to Supabase
        // For now, return the response
        return {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: text,
          timestamp: new Date(),
        };
      } catch (error: any) {
        console.error("Error generating response:", error);
        
        // Handle specific quota errors
        if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('Too Many Requests')) {
          return {
            id: Date.now().toString(),
            role: "assistant" as const,
            content: "I've reached my daily API quota limit. The service will reset tomorrow, or you can upgrade to a paid plan for higher limits. For now, I can still help with general questions using my demo responses.",
            timestamp: new Date(),
          };
        }
        
        // Return a fallback response for other errors
        return {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "I apologize, but I'm having trouble generating a response right now. Please try again later.",
          timestamp: new Date(),
        };
      }
    }),

  getConversations: publicProcedure.query(async ({ ctx }) => {
    // This would fetch conversations from Supabase
    return [];
  }),

  getMessages: publicProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ input, ctx }) => {
      // This would fetch messages from Supabase
      return [];
    }),
});
