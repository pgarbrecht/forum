import express from 'express';
import {
	getComments,
	addComment,
	editComment,
	deleteComment,
} from '../controllers/comments.js';

const router = express.Router();

// Use controller
router.get('/', getComments);
router.post('/', addComment);
router.put('/:id', editComment);
router.delete('/:id', deleteComment);

export default router;
