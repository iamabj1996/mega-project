import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/contract');
		return { data };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return redirect('/login');
	}
};

const ContractContext = createContext();

const ContractLayout = () => {
	const { data } = useLoaderData();
	return (
		<ContractContext.Provider
			value={{ data }}
			className='min-h-screen bg-lightMainBg dark:bg-darkMainBg p-1 sm:p-2 md:p-1'
		>
			<Outlet />
		</ContractContext.Provider>
	);
};

export const useContractContext = () => useContext(ContractContext);

export default ContractLayout;
