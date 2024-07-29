// Dependencies
import React from 'react';
import Post from '../post/Post';
import './posts.scss';

const Posts = (props) => {
	const posts = props.posts;
	const refetch = props.refetch;

	return (
		<div className='posts'>
			{posts.map((post) => (
				<Post post={post} key={post.id} refetch={refetch} />
			))}
		</div>
	);
};

export default Posts;
