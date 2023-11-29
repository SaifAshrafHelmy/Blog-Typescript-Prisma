import express from 'express';
import * as dotenv from 'dotenv';
import MessageResponse from './interfaces/MessageResponse.js';
import api from './api/index.js';
import * as middlewares from './middlewares.js';
import session from 'express-session';
import apicache from 'apicache';
import cors, { CorsOptions } from 'cors';
import { User } from '@prisma/client';
dotenv.config();
const port = process.env.PORT || 3000;
declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
};
const corsOptions: CorsOptions = {
  origin: [`http://localhost:${port}`],
  methods: ['GET', 'POST'],
  credentials: true,
};

apicache.middleware('5 minutes');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));

app.get<{}, MessageResponse>('/', (req, res) => {
  res.status(200).json({ message: "You're good" });
});

app.use('/api/v1', api);

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Express app is listening on http://localhost:${port}`);
});
