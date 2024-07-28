import React, { useState } from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

function Routes() {
	/* React router functionality is used to help make protected pages secure and scalable.
	A ProtectedRoute component is the parent component that renders a Layout component.
	The Layout component renders global components, like header+footer and the Outlet component.
	The Outlet component renders the currently active page, such as the Home page component.
	If the user is not logged in though, then the Navigate component sends them to Login. */

	const [currentUser, setCurrentUser] = useState(true);

	const Layout = () => {
		return (
			<div>
				<div>
					<Outlet />
				</div>
			</div>
		);
	};

	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to='login' />;
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
