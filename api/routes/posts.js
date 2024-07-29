import express from 'express';
import { getPosts, deletePost } from '../controllers/posts.js';

const router = express.Router();

// Use controller
router.get('/', getPosts);
router.delete('/:id', deletePost);

export default router;
