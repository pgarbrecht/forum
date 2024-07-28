// Dependencies
import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export const login = (req, res) => {
	const q = 'SELECT * FROM users WHERE email = ?';
	// Authenticate user with the email and password they provided to login
	db.query(q, [req.body.email], (err, data) => {
		if (err) {
			return res.status(500).json(err);
		}
		if (data.length === 0) {
			return res
				.status(404)
				.json(`No user was found with email ${req.body.email}`);
		}
		const isCorrectPassword = bcrypt.compareSync(
			req.body.password,
			data[0].password
		);
		if (!isCorrectPassword) {
			return res.status(400).json('The email or password is not correct');
		}
		// If the login information is correct, set a JWT cookie to authorize their use
		const token = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY);
		const { password, ...safeUserProperties } = data[0]; // destructure to exclude password in JSON response
		res
			.cookie('accessToken', token, {
				httpOnly: true,
			})
			.status(200)
			.json(safeUserProperties);
	});
};

export const logout = (req, res) => {
	// Remove the JWT cookie
	res
		.clearCookie('accessToken', {
			// options ensure browser removes cookie
			secure: true,
			sameSite: 'none',
		})
		.status(200)
		.json('User has been logged out');
};
