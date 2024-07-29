import React from 'react';
import PostForm from '../../components/postForm/PostForm';
import Posts from '../../components/posts/Posts';
import './home.scss';

const Home = () => {
	return (
		<div className='home'>
			<PostForm />
			<Posts />
		</div>
	);
};

export default Home;
