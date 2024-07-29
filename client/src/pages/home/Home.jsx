import React, { useEffect, useState } from 'react';
import PostForm from '../../components/postForm/PostForm';
import Posts from '../../components/posts/Posts';
import { makeRequest } from '../../utils';
import './home.scss';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [toggleRefetch, setToggleRefetch] = useState(false);
	const refetch = () => {
		setToggleRefetch(!toggleRefetch);
	};

	useEffect(() => {
		makeRequest.get('/posts').then((res) => {
			setPosts(res.data);
			console.log('the posts data is: ', posts);
		});
	}, [toggleRefetch]);

	return (
		<div className='home'>
			<PostForm refetch={refetch} />
			<Posts posts={posts} refetch={refetch} />
		</div>
	);
};

export default Home;
