import { db } from '../connect.js';
import moment from 'moment';

export const getComments = (req, res) => {
	const q = `SELECT c.*, u.id AS userId, username FROM comments AS c JOIN users AS u ON (u.id = c.userId)
      WHERE c.postId = ? ORDER BY c.createdAt ASC
      `;

	db.query(q, [req.query.postId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data);
	});
};

export const addComment = (req, res) => {
	const q =
		'INSERT INTO comments(`description`, `createdAt`, `userId`, `postId`) VALUES (?)';
	const values = [
		req.body.description,
		moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
		req.body.userId,
		req.body.postId,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json('Comment has been created.');
	});
};

export const editComment = (req, res) => {
	const commentId = req.params.id;
	const q =
		'UPDATE comments SET `description`= ?, `userId`=?, `createdAt`=? WHERE id = ?';

	const values = [req.body.description, req.body.userId, req.body.createdAt];

	db.query(q, [...values, commentId], (err, data) => {
		if (err) return res.send(err);
		return res.status(200).json('Comment has been updated.');
	});
};

export const deleteComment = (req, res) => {
	const commentId = req.params.id;
	const q = 'DELETE FROM comments WHERE `id` = ?';

	db.query(q, [commentId], (err, data) => {
		if (err) return res.status(500).json(err);
		if (data.affectedRows > 0) return res.json('Comment has been deleted.');
		return res.status(403).json('You can delete only your comment.');
	});
};
