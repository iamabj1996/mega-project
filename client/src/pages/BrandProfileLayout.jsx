import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/brand_profile');
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.msg || 'Failed to fetch brand profile');
		return redirect('/login');
	}
};

const BrandProfileContext = createContext();

const BrandProfileLayout = () => {
	const { brandProfile } = useLoaderData();
	return (
		<BrandProfileContext.Provider
			value={{ brandProfile }}
			className='min-h-screen bg-lightMainBg dark:bg-darkMainBg p-1 sm:p-2 md:p-1'
		>
			{/* <h1 className='text-3xl font-bold mb-8'>YouTube Channel Cards</h1> */}
			<Outlet />
		</BrandProfileContext.Provider>
	);
};

export const useBrandProfileContext = () => useContext(BrandProfileContext);

export default BrandProfileLayout;
