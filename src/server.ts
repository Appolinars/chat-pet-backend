import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
dotenv.config();

import { connectDB } from './config/mongodb';

import { errorHandler } from './middlewares/errors.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';

import { appRouter } from './router/router';

const app: Express = express();
const port = process.env.PORT;
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use('/api', appRouter);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
