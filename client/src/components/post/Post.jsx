import React from 'react';
import './post.scss';

const Post = (props) => {
	const post = props.post;
	return (
		<div className='post'>
			<p>{post.description}</p>
		</div>
	);
};

export default Post;
