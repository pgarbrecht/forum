// Dependencies
import React, { useState, useContext, useEffect } from 'react';
import { makeRequest } from '../../utils';
import { AuthContext } from '../../context/authContext';
import './post.scss';
import axios from 'axios';

const Post = (props) => {
	// Variables
	const { post, refetch } = props;
	const { currentUser } = useContext(AuthContext);

	// State
	const [isEditing, setIsEditing] = useState(false);
	const [inputs, setInputs] = useState({
		userId: currentUser.id,
		description: post.description,
	});
	const [comments, setComments] = useState([]);

	// Effects
	useEffect(() => {
		makeRequest.get(`/comments?postId=${post.id}`).then((res) => {
			setComments(res.data);
		});
	}, []);

	useEffect(() => {
		console.log('the comments data is: ', comments);
	}, [comments]);

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

	return (
		<div className='post'>
			<div className='description'>
				{/* If editing the post, show form. If not editing the post, show description. */}
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
				{comments?.map((comment) => (
					<div>{comment.description}</div>
				))}
			</div>
			<div className='actions'>
				{/* The buttons to edit or delete post are only shown if it is the current user's post */}
				{post.userId === currentUser.id && !isEditing && (
					<p className='edit' onClick={handleEdit}>
						Edit
					</p>
				)}
				{post.userId === currentUser.id && !isEditing && (
					<p className='delete' onClick={handleDelete}>
						Delete
					</p>
				)}
			</div>
		</div>
	);
};

export default Post;
