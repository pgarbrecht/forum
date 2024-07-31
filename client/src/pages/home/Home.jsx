import React, { useEffect, useState } from 'react';
import PostForm from '../../components/postForm/PostForm';
import Posts from '../../components/posts/Posts';
import { makeRequest } from '../../utils';
import './home.scss';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [toggleRefetchPosts, setToggleRefetchPosts] = useState(false);
	const refetchPosts = () => {
		setToggleRefetchPosts(!toggleRefetchPosts);
	};

	useEffect(() => {
		makeRequest.get('/posts').then((res) => {
			setPosts(res.data);
			console.log('the posts data is: ', posts);
		});
	}, [toggleRefetchPosts]);

	return (
		<div className='home'>
			<PostForm refetchPosts={refetchPosts} />
			<Posts posts={posts} refetchPosts={refetchPosts} />
		</div>
	);
};

export default Home;
