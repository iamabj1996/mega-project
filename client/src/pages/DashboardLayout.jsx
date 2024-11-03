import { Outlet, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { BigSidebar, Navbar } from '../components';
import { useState, useEffect, createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/users/current-user');
		return data;
	} catch (error) {
		return redirect('/login');
	}
};

const DashboardContext = createContext();

const DashboardLayout = () => {
	const { user } = useLoaderData();
	const navigate = useNavigate();

	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(true);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle('dark');
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		navigate('/');
		await customFetch.get('/auth/logout');
		toast.success('Logging out');
	};

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				toggleSidebar,
				logoutUser,
				isDarkMode,
				toggleDarkMode,
			}}
		>
			<div className='flex h-screen overflow-hidden'>
				<BigSidebar />
				<div className='flex flex-col flex-1 overflow-hidden'>
					<Navbar />
					<main className='flex-1 overflow-y-auto '>
						<Outlet context={{ user }} />
					</main>
				</div>
			</div>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
