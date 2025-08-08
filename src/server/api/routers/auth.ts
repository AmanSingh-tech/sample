import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async ({ ctx }) => {
    // For API routes, we need to handle session differently
    return { user: null, isAuthenticated: false };
  }),

  // This will be called from client components
  getMe: publicProcedure.query(async () => {
    // This will be handled on the client side with Auth0's useUser hook
    return { user: null };
  }),
});
