import React, { useContext } from 'react';
import './header.scss';
import { AuthContext } from '../context/authContext';

const Header = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className='header'>
			<div className='left'>
				<img src='logo.svg' />
				<span>Forum</span>
			</div>
			<div className='right'>
				<div className='user'>
					<span>{currentUser.username}</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
