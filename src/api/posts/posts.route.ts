import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'What Posts?' });
});

export default router;
