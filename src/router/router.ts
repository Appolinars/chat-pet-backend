import { Router } from "express";
import { userRoutes } from "./user.routes";
import { chatRoutes } from "./chat.routes";
import { messageRoutes } from "./message.routes";

export const appRouter = Router();

userRoutes(appRouter);
chatRoutes(appRouter);
messageRoutes(appRouter);