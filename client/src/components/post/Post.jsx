// Dependencies
import React, { useContext } from 'react';
import { makeRequest } from '../../utils';
import { AuthContext } from '../../context/authContext';
import './post.scss';

const Post = (props) => {
	// Variables
	const post = props.post;
	const refetch = props.refetch;
	const { currentUser } = useContext(AuthContext);

	// Functions
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
			<p>{post.description}</p>
			{/* The button to delete post is only shown if it is the current user's post */}
			{post.userId === currentUser.id && <p onClick={handleDelete}>X</p>}
		</div>
	);
};

export default Post;
