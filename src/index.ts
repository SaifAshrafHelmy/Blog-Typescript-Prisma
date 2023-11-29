import express from 'express';
import * as dotenv from 'dotenv';
import MessageResponse from './interfaces/MessageResponse.js';
import api from './api/index.js';
import * as middlewares from './middlewares.js';
dotenv.config();

const app = express();
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.status(200).json({ message: "You're good" });
});

app.use('/api/v1', api);

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express app is listening on http://localhost:${port}`);
});
