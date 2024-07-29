// Dependencies
import React, { useState, useContext } from 'react';
import './postform.scss';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

const PostForm = (props) => {
	// Variables
	const { currentUser } = useContext(AuthContext);
	const refetch = props.refetch;

	// State
	const [inputs, setInputs] = useState({
		userId: currentUser.id,
		description: '',
	});

	// Functions
	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// First create the user account
			await axios.post('http://localhost:3001/api/posts', inputs);
			// Then refetch posts to show new post on the page
			refetch();
		} catch (err) {
			console.log('Error occurred: ', err);
		}
	};

	return (
		<div className='postform'>
			<form>
				<textarea
					type='text'
					placeholder='Type a new post here'
					name='description'
					onChange={handleChange}
				/>
				<button onClick={handleSubmit}>Post</button>
			</form>
		</div>
	);
};

export default PostForm;
