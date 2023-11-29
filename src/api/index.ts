import express from 'express';
import MessageResponse from '../interfaces/MessageResponse.js';
import usersRouter from './users/users.route.js';
import postsRouter from './posts/posts.route.js';
import { authenticateUser } from '../middlewares.js';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({ message: "You're inside the API" });
});

router.use('/users', usersRouter);
router.use('/posts', postsRouter);

router.get('/secret', authenticateUser, (req, res) => {
  res.json({ message: 'You have access', user: req.session.user });
});

export default router;
