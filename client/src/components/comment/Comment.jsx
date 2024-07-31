// Dependencies
import { useContext } from 'react';
import { makeRequest } from '../../utils';
import { AuthContext } from '../../context/authContext';

const Comment = (props) => {
	// Variables
	const { description, id, postId, userId } = props.data;
	const refetchComments = props.refetchComments;
	const { currentUser } = useContext(AuthContext);

	// Functions
	const handleEdit = () => {};
	const handleDelete = async () => {
		await makeRequest.delete(`/comments/${id}`).then((res) => {
			console.log('the delete response is: ', res.data);
		});
		// Then refetch posts so page updates to show deleted post not there
		refetchComments();
	};

	return (
		<div className='comment'>
			<p>{description}</p>
			<div className='actions'>
				{/* The buttons to edit or delete comment are only shown if it is the current user's comment */}
				{userId === currentUser.id && (
					<p className='edit' onClick={handleEdit}>
						Edit
					</p>
				)}
				{userId === currentUser.id && (
					<p className='delete' onClick={handleDelete}>
						Delete
					</p>
				)}
			</div>
		</div>
	);
};

export default Comment;
