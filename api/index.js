// Dependencies
import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';

// Variables
const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Routing
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, () => {
	console.log(`Server is running at port: ${port}`);
});
