import { db } from '../connect.js';

export const getPosts = (req, res) => {
	const q = `SELECT * FROM posts`;

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data);
	});
};

export const deletePost = (req, res) => {
	const postId = req.params.id;
	const q = ' DELETE FROM posts WHERE id = ? ';

	db.query(q, [postId], (err, data) => {
		if (err) return res.send(err);
		if (data.affectedRows > 0)
			return res.status(200).json('Post has been deleted.');
	});
};
