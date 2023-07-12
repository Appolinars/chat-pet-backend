import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

import { connectDB } from './config/mongodb';

import { errorHandler } from './middlewares/errors.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';

import { appRouter } from './router/router';
import { ChatModel } from './models/chat.model';
import { IUser } from './models/user.model';

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

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

export const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('App connection established');

  socket.on('setup', (userData: IUser) => {
    socket.join(userData._id);
    socket.emit('USERS_ONLINE', Array.from(onlineUsers.values()));

    onlineUsers.set(socket.id, userData._id);
    socket.broadcast.emit('USER_ONLINE', userData._id);
  });

  socket.on('JOIN_CHAT', (chatId) => {
    socket.join(chatId);
    console.log('User Joined Room: ' + chatId);
  });

  socket.on('USER_TYPING', ({ chatId, user }) => {
    socket.in(chatId).emit('USER_TYPING', user);
    console.log('User is typing: ' + user.username);
  });

  socket.on('USER_STOPED_TYPING', ({ chatId, user }) => {
    socket.in(chatId).emit('USER_STOPED_TYPING', user);
    console.log('User is stoped typing: ' + user.username);
  });

  socket.on('NEW_MESSAGE', async (message) => {
    try {
      const chat = await ChatModel.findById(message.chat);
      socket.emit('NEW_MESSAGE', message); // back to sender

      chat?.users.forEach((objectId) => {
        const userId = objectId.toString();
        // to all other users. socket.in does not send event to sender
        socket.in(userId).emit('NEW_MESSAGE', message);
        // if (userId !== message.sender._id) {
        //   socket.in(userId).emit('NEW_MESSAGE', message);
        // }
      });
    } catch {
      socket.emit('SOCKET_ERROR', 'Socket error. Other users may not get the message immediately.');
    }
  });

  socket.on('disconnect', () => {
    for (const [socketId, userId] of onlineUsers.entries()) {
      if (socketId == socket.id) {
        io.emit('USER_OFFLINE', userId);
        onlineUsers.delete(socketId);
        break;
      }
    }
  });
});

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});
