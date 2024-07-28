import React from 'react';
import './login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
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
						<input type='text' placeholder='Email' />
						<input type='password' placeholder='Password' />
						<button>Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
