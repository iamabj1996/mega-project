import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async ({ params }) => {
	try {
		const { data } = await customFetch.get(`/contract/${params.id}`);
		return { data };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const SingleContract = () => {
	const { data } = useLoaderData();
	const { contract } = data;

	return <div>SingleContract</div>;
};
export default SingleContract;
