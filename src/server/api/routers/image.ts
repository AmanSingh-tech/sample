import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from "@huggingface/inference";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const imageRouter = createTRPCRouter({
  generateImage: publicProcedure
    .input(
      z.object({
        prompt: z.string().min(1),
        model: z.enum(["flux", "stable-diffusion", "dalle-mini"]).optional().default("flux"),
        size: z.enum(["512x512", "768x768", "1024x1024"]).optional().default("1024x1024"),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Received input in image.generateImage:", input);
      
      try {
        // Check if Hugging Face API key is available
        if (!process.env.HUGGINGFACE_API_KEY) {
          // Fallback to description generation using Gemini
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const result = await model.generateContent([
            "Generate a detailed description for creating an image based on this prompt:",
            input.prompt
          ]);
          
          const response = result.response;
          const text = response.text();

          return {
            id: Date.now().toString(),
            prompt: input.prompt,
            description: text,
            imageUrl: null,
            timestamp: new Date(),
            error: "No Hugging Face API key configured. Add HUGGINGFACE_API_KEY to .env.local for actual image generation.",
          };
        }

        // Generate actual image using Hugging Face
        let modelName = "black-forest-labs/FLUX.1-dev"; // Default to FLUX
        
        switch (input.model) {
          case "stable-diffusion":
            modelName = "stabilityai/stable-diffusion-2-1";
            break;
          case "dalle-mini":
            modelName = "craiyon/dalle-mini";
            break;
          case "flux":
          default:
            modelName = "black-forest-labs/FLUX.1-dev";
            break;
        }

        console.log(`Generating image with model: ${modelName}`);
        
        const imageBlob = await hf.textToImage({
          model: modelName,
          inputs: input.prompt,
          parameters: {
            num_inference_steps: 30,
            guidance_scale: 7.5,
          }
        });

        // Convert blob to base64 for easy handling
        let base64Image: string;
        let imageUrl: string;
        
        if (imageBlob && typeof imageBlob === 'object' && 'arrayBuffer' in imageBlob) {
          const arrayBuffer = await (imageBlob as Blob).arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          base64Image = buffer.toString('base64');
          imageUrl = `data:image/png;base64,${base64Image}`;
        } else {
          // Handle case where response might be different format
          console.log("Unexpected image response format:", typeof imageBlob);
          throw new Error("Unexpected image response format");
        }

        // Also generate a description using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const descResult = await model.generateContent([
          "Describe this image generation request in a creative way:",
          input.prompt
        ]);
        
        const description = descResult.response.text();

        return {
          id: Date.now().toString(),
          prompt: input.prompt,
          description,
          imageUrl,
          model: input.model,
          size: input.size,
          timestamp: new Date(),
        };
        
      } catch (error) {
        console.error("Error generating image:", error);
        
        // Fallback to description generation
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const result = await model.generateContent([
            "Generate a detailed description for creating an image based on this prompt:",
            input.prompt
          ]);
          
          const response = result.response;
          const text = response.text();

          return {
            id: Date.now().toString(),
            prompt: input.prompt,
            description: text,
            imageUrl: null,
            timestamp: new Date(),
            error: `Image generation failed: ${error instanceof Error ? error.message : 'Unknown error'}. Showing description instead.`,
          };
        } catch (descError) {
          return {
            id: Date.now().toString(),
            prompt: input.prompt,
            description: "I apologize, but I'm unable to generate an image or description at the moment. Please try again later.",
            imageUrl: null,
            timestamp: new Date(),
            error: "Both image generation and description generation failed.",
          };
        }
      }
    }),

  getGeneratedImages: publicProcedure.query(async () => {
    // This would fetch generated images from Supabase
    return [];
  }),
});
