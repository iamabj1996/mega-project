import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { SingleYtChannelComponent } from '../components';

export const loader = async ({ params }) => {
	try {
		const { data } = await customFetch.get(`/youtube_channels/${params.id}`);
		return { data };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const SingleYtChannel = () => {
	const { data } = useLoaderData();
	const { youtubeChannel } = data;
	return (
		<div className='p-4'>
			<SingleYtChannelComponent {...youtubeChannel} />
		</div>
	);
};
export default SingleYtChannel;
