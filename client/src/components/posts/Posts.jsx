// import Post from '../post/Post';
// import './posts.scss';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../utils';

const Posts = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ['posts'],
		queryFn: () => {
			makeRequest.get('/posts').then((res) => {
				console.log('the res is: ', res);
				return res.data;
			});
		},
	});

	console.log('the data is: ', data);
	return <div className='posts'></div>;
};

export default Posts;
