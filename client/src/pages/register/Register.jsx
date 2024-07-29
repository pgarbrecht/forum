// Dependencies
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
	// State
	const [inputs, setInputs] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);

	// Functions
	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	// Variables
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// First create the user account
			await axios.post('http://localhost:3001/api/auth/register', inputs);
			// Then log them in and send to home route for convenience
			const { username, ...loginInputs } = inputs;
			await login(loginInputs);
			navigate('/');
		} catch (err) {
			setError(err.response.data);
		}
	};

	return (
		<div className='register'>
			<div className='card'>
				<div className='left'>
					<h1>Join the Think Tank</h1>
					<p>
						By creating a free Forum account, you'll gain access to the greatest
						resource known to humankind: knowledge. Just provide some quick info
						and you'll be on your way.
					</p>
					<span>Already have an account?</span>
					<Link to='/login' className='link'>
						Login
					</Link>
				</div>
				<div className='right'>
					<div className='heading'>
						<img src='logo.svg' />
						<h2>Register</h2>
					</div>
					<form>
						<input
							type='text'
							placeholder='Username'
							name='username'
							onChange={handleChange}
						/>
						<input
							type='text'
							placeholder='Email'
							name='email'
							onChange={handleChange}
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							onChange={handleChange}
						/>
						{error && <p>{error}</p>}
						<button onClick={handleSubmit}>Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
