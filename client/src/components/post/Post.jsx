// Dependencies
import React, { useState, useContext } from 'react';
import { makeRequest } from '../../utils';
import { AuthContext } from '../../context/authContext';
import './post.scss';
import axios from 'axios';

const Post = (props) => {
	// Variables
	const post = props.post;
	const refetch = props.refetch;
	const { currentUser } = useContext(AuthContext);

	// State
	const [isEditing, setIsEditing] = useState(false);
	const [inputs, setInputs] = useState({
		userId: currentUser.id,
		description: post.description,
	});

	// Functions
	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// First submit the update post request
			await axios.put(`http://localhost:3001/api/posts/${post.id}`, inputs);
			// Then change the state so that post won't show edit form
			setIsEditing(false);
			// Then refetch posts to show new post on the page
			refetch();
		} catch (err) {
			console.log('Error occurred: ', err);
		}
	};

	const handleDelete = async () => {
		await makeRequest.delete(`/posts/${post.id}`).then((res) => {
			console.log('the delete response is: ', res.data);
		});
		// Then refetch posts so page updates to show deleted post not there
		refetch();
	};

	console.log('the post info is: ', post);

	return (
		<div className='post'>
			{/* If not editing the post, show description. If editing the post, show form. */}
			{isEditing ? (
				<form>
					<textarea
						type='text'
						value={inputs.description}
						name='description'
						onChange={handleChange}
					/>
					<button onClick={handleSubmit}>Submit</button>
				</form>
			) : (
				<p>{post.description}</p>
			)}
			{/* The buttons to edit or delete post are only shown if it is the current user's post */}
			{post.userId === currentUser.id && (
				<p className='edit' onClick={handleEdit}>
					Edit
				</p>
			)}
			{post.userId === currentUser.id && (
				<p className='delete' onClick={handleDelete}>
					Delete
				</p>
			)}
		</div>
	);
};

export default Post;
