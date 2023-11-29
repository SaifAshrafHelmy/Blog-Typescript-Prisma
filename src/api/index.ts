import express from 'express';
import MessageResponse from '../interfaces/MessageResponse.js';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({ message: "You're inside the API" });
});

export default router;
