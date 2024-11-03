import { useAllCreatorsContext } from '../pages/AllCreatorsLayout';
import YoutubeChannelCard from './YoutubeChannelCard';

const AllCreatorsContainer = () => {
	const { data } = useAllCreatorsContext();
	const { youtubeChannels } = data;

	if (youtubeChannels.length === 0) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6'>
				<h2 className='text-3xl font-bold mb-8'>
					No creators data yet to display
				</h2>
			</div>
		);
	}
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6'>
			{youtubeChannels?.map((channel, index) => (
				<YoutubeChannelCard key={index} {...channel} />
			))}
		</div>
	);
};
export default AllCreatorsContainer;
