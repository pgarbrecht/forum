// Dependencies
import React, { useState } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(
			'sending request to: ',
			'http://localhost:3001/api/auth/register',
			'with inputs: ',
			inputs
		);
		try {
			await axios.post('http://localhost:3001/api/auth/register', inputs);
		} catch (err) {
			console.log('got the err: ', err);
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
