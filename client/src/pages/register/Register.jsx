import React from 'react';
import './register.scss';
import { Link } from 'react-router-dom';

const Register = () => {
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
						<input type='text' placeholder='Username' />
						<input type='text' placeholder='Email' />
						<input type='password' placeholder='Password' />
						<button>Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
