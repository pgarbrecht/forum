import React from 'react';
import { makeRequest } from '../../utils';
import './post.scss';

const Post = (props) => {
	// Variables
	const post = props.post;

	// Functions
	const handleDelete = () => {
		makeRequest.delete(`/posts/${post.id}`).then((res) => {
			console.log('the delete response is: ', res.data);
		});
	};

	return (
		<div className='post'>
			<p>{post.description}</p>
			<p onClick={handleDelete}>X</p>
		</div>
	);
};

export default Post;
