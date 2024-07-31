// Dependencies
import React from 'react';
import Post from '../post/Post';
import './posts.scss';

const Posts = (props) => {
	const { posts, refetchPosts } = props;

	return (
		<div className='posts'>
			{posts.map((post) => (
				<Post post={post} key={post.id} refetchPosts={refetchPosts} />
			))}
		</div>
	);
};

export default Posts;
