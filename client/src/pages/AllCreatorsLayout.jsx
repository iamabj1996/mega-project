import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/youtube_channels/search_creators');
		const instagramResponse = await customFetch.get(
			'/instagram/search_creators'
		);
		const instagramPages = instagramResponse?.data?.instagramPages;
		console.log('data2', instagramPages);
		return { data, instagramPages };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return redirect('/login');
	}
};

const AllCreatorsContext = createContext();

const AllCreatorsLayout = () => {
	const { data, instagramPages } = useLoaderData();
	return (
		<AllCreatorsContext.Provider
			value={{ data, instagramPages }}
			className='min-h-screen bg-lightMainBg dark:bg-darkMainBg p-1 sm:p-2 md:p-1'
		>
			{/* <h1 className='text-3xl font-bold mb-8'>YouTube Channel Cards</h1> */}
			<Outlet />
		</AllCreatorsContext.Provider>
	);
};

export const useAllCreatorsContext = () => useContext(AllCreatorsContext);

export default AllCreatorsLayout;
