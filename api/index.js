import Express from 'express';
const app = Express();
const port = 3001;

app.listen(port, () => {
	console.log(`Server is running at port: ${port}`);
});
