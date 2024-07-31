// Dependencies
import React, { useState, useContext } from 'react';
import './commentForm.scss';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

const CommentForm = (props) => {
	// Variables
	const { currentUser } = useContext(AuthContext);
	const refetchComments = props.refetchComments;
	const postId = props.postId;

	// State
	const [inputs, setInputs] = useState({
		userId: currentUser.id,
		description: '',
		postId: postId,
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
			// First create the comment
			console.log('trying to post comment with inputs: ', inputs);
			await axios.post('http://localhost:3001/api/comments', inputs);
			// Then refetch comments to show new comment on the page
			refetchComments();
		} catch (err) {
			console.log('Error occurred: ', err);
		}
	};

	return (
		<div className='commentform'>
			<form>
				<textarea
					type='text'
					placeholder='Type a new comment here'
					name='description'
					onChange={handleChange}
				/>
				<button onClick={handleSubmit}>Add Comment</button>
			</form>
		</div>
	);
};

export default CommentForm;
