// Dependencies
import { db } from '../connect.js';
import bcrypt from 'bcryptjs';

export const register = (req, res) => {
	// Check if username being registered already exists
	const q = 'SELECT * FROM users WHERE username = ?';
	db.query(q, [req.body.username], (err, data) => {
		if (err) {
			return res.status(500).json(err);
		}
		if (data.length) {
			return res
				.status(409)
				.json(`The user ${req.body.username} already exists.`);
		}
		// if the username does not already exist, create a new user with hashed password
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(req.body.password, salt);
		const q = 'INSERT INTO users (`username`, `email`, `password`) VALUE (?)';
		const values = [req.body.username, req.body.email, hashedPassword];
		db.query(q, [values], (err, data) => {
			if (err) {
				return res.status(500).json(err);
			}
			return res
				.status(200)
				.json(`The user ${req.body.username} has been created`);
		});
	});
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
