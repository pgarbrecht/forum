import React, { useEffect, useState } from 'react';
import { makeRequest } from '../../utils';

const Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		makeRequest.get('/posts').then((res) => {
			setPosts(res.data);
		});
	}, []);
	console.log('the posts are: ', posts);
	return <div className='posts'></div>;
};

export default Posts;
