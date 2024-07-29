import express from 'express';
import { getPosts, addPost, deletePost } from '../controllers/posts.js';

const router = express.Router();

// Use controller
router.get('/', getPosts);
router.post('/', addPost);
router.delete('/:id', deletePost);

export default router;
