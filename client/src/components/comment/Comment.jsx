// Dependencies
import { useState, useContext } from 'react';
import { makeRequest } from '../../utils';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import './comment.scss';

const Comment = (props) => {
	// Variables
	const { description, id, postId, userId, username, createdAt } = props.data;
	const refetchComments = props.refetchComments;
	const { currentUser } = useContext(AuthContext);

	// State
	const [isEditing, setIsEditing] = useState(false);
	const [inputs, setInputs] = useState({
		description: description,
		userId: currentUser.id,
		postId: postId,
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
			await axios.put(`http://localhost:3001/api/comments/${id}`, inputs);
			// Then change the state so that post won't show edit form
			setIsEditing(false);
			// Then refetch posts to show new post on the page
			refetchComments();
		} catch (err) {
			console.log('Error occurred: ', err);
		}
	};
	const handleDelete = async () => {
		await makeRequest.delete(`/comments/${id}`).then((res) => {
			console.log('the delete response is: ', res.data);
		});
		// Then refetch posts so page updates to show deleted post not there
		refetchComments();
	};

	return (
		<div className='comment'>
			<div className='actions'>
				{/* The buttons to edit or delete comment are only shown if it is the current user's comment */}
				{userId === currentUser.id && !isEditing && (
					<p className='edit' onClick={handleEdit}>
						Edit
					</p>
				)}
				{userId === currentUser.id && !isEditing && (
					<p className='delete' onClick={handleDelete}>
						Delete
					</p>
				)}
			</div>
			<div>
				{/* If editing the post, show form. If not editing the post, show description. */}
				{isEditing ? (
					<form>
						<textarea
							type='text'
							value={inputs.description}
							name='description'
							onChange={handleChange}
						/>
						<button onClick={handleSubmit}>Update Comment</button>
					</form>
				) : (
					<p className='description'>{`${username} says: ${description}`}</p>
				)}
			</div>
		</div>
	);
};

export default Comment;
