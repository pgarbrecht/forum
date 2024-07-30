import express from 'express';
import {
	getPosts,
	addPost,
	editPost,
	deletePost,
} from '../controllers/posts.js';

const router = express.Router();

// Use controller
router.get('/', getPosts);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);

export default router;
