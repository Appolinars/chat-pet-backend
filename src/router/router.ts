import { Router } from "express";
import { userRoutes } from "./user.routes";

export const appRouter = Router();

userRoutes(appRouter);