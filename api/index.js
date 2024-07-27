// Dependencies
import Express from 'express';
import userRoutes from './routes/users.js';

// Variables
const app = Express();
const port = 3001;

// Routing
app.use('/api/users', userRoutes);

app.listen(port, () => {
	console.log(`Server is running at port: ${port}`);
});
