import express from 'express';
import {
    createPost,
    deletePost,
    getPost,
    getPosts,
    getCurrentUserPosts,
    updatePost,
} from './posts.controller.js';
import { authenticateUser } from '../../middlewares.js';

const router = express.Router({ mergeParams: true });

router.get('/', getPosts);
router.get('/mine', authenticateUser, getCurrentUserPosts);
router.get('/:postId', getPost);
router.post('/', authenticateUser, createPost);
router.patch('/:postId', authenticateUser, updatePost);
router.delete('/:postId', authenticateUser, deletePost);

export default router;
