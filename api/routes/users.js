import express from 'express';
import { getUser } from '../controllers/users.js';

const router = express.Router();

// Use controller
router.get('/find/:userId', getUser);

export default router;
