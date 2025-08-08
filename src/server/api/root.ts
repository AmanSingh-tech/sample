import { createTRPCRouter } from "./trpc";
import { chatRouter } from "./routers/chat";
import { authRouter } from "./routers/auth";
import { imageRouter } from "./routers/image";

export const appRouter = createTRPCRouter({
  chat: chatRouter,
  auth: authRouter,
  image: imageRouter,
});

export type AppRouter = typeof appRouter;
