import { db } from '../connect.js';
import moment from 'moment';

export const getPosts = (req, res) => {
	const q = `SELECT * FROM posts`;

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data);
	});
};

export const addPost = (req, res) => {
	const q =
		'INSERT INTO posts(`description`, `userId`, `createdAt`) VALUES (?)';

	const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	const values = [req.body.description, req.body.userId, createdAt];

	db.query(q, [values], (err, data) => {
		if (err) return res.send(err);
		return res.status(200).json('Post has been added.');
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
