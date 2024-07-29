// Dependencies
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	// State
	const [inputs, setInputs] = useState({
		username: '',
		password: '',
	});
	const [error, setError] = useState(null);

	// Variables
	const navigate = useNavigate();

	// Functions
	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const { login } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(inputs);
			navigate('/');
		} catch (err) {
			setError(err.response.data);
		}
	};

	return (
		<div className='login'>
			<div className='card'>
				<div className='left'>
					<h1>Welcome to the Forum</h1>
					<p>
						This is a place for great minds to discuss great topics. Bring your
						deep questions, curiosities, and musings here. Where there is an
						open mind, there will always be a great frontier to explore.
					</p>
					<span>Don't have an account?</span>
					<Link to='/register' className='link'>
						Register
					</Link>
				</div>
				<div className='right'>
					<div className='heading'>
						<img src='logo.svg' />
						<h2>Login</h2>
					</div>
					<form>
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

export default Login;
