import React, { useContext } from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Routes() {
	/* React router and useContext are used to help make protected pages secure and scalable.
	A ProtectedRoute component is the parent component that checks whether the user can proceed.
	If the user is logged in, ProtectedRoute renders Layout, if not it redirects user to Login.
	The Layout component renders global components, like header+footer and the Outlet component.
	The Outlet component renders the currently active page, such as the Home page component. */

	const { currentUser } = useContext(AuthContext);
	const queryClient = new QueryClient();

	const Layout = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<div>
					<div>
						<Outlet />
					</div>
				</div>
			</QueryClientProvider>
		);
	};

	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to='/login' />;
		}
		return children;
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<ProtectedRoute>
					<Layout />
				</ProtectedRoute>
			),
			children: [
				{
					path: '/',
					element: <Home />,
				},
				// Could add more protected pages here if this app were to grow
			],
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/register',
			element: <Register />,
		},
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default Routes;
