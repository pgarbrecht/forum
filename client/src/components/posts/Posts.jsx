import React, { useEffect, useState } from 'react';
import { makeRequest } from '../../utils';
import Post from '../post/Post';
import './posts.scss';

const Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		makeRequest.get('/posts').then((res) => {
			setPosts(res.data);
			console.log('the posts data is: ', posts);
		});
	}, []);

	return (
		<div className='posts'>
			{posts.map((post) => (
				<Post post={post} key={post.id} />
			))}
		</div>
	);
};

export default Posts;
