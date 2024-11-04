import React, { useState } from 'react';
import { useAllCreatorsContext } from '../pages/AllCreatorsLayout';
import InstagramCreatorCard from './InstagramCreatorCard';
import YoutubeChannelCard from './YoutubeChannelCard';
import { FaSearch, FaYoutube, FaInstagram } from 'react-icons/fa';

const AllCreatorsContainer = () => {
	const { data, instagramPages } = useAllCreatorsContext();
	const { youtubeChannels } = data;

	const [searchTerm, setSearchTerm] = useState('');
	const [showYoutube, setShowYoutube] = useState(true);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const filteredYoutubeChannels = youtubeChannels.filter((channel) =>
		channel.name.toLowerCase().includes(searchTerm)
	);

	const filteredInstagramPages = instagramPages.filter((page) =>
		page.creatorName.toLowerCase().includes(searchTerm)
	);

	const renderContent = () => {
		if (showYoutube && filteredYoutubeChannels.length === 0) {
			return (
				<h2 className='text-3xl font-bold mb-8'>No YouTube creators found</h2>
			);
		}
		if (!showYoutube && filteredInstagramPages.length === 0) {
			return (
				<h2 className='text-3xl font-bold mb-8'>No Instagram creators found</h2>
			);
		}

		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{showYoutube
					? filteredYoutubeChannels.map((channel, index) => (
							<YoutubeChannelCard key={index} {...channel} />
					  ))
					: filteredInstagramPages.map((channel, index) => (
							<InstagramCreatorCard key={index} {...channel} />
					  ))}
			</div>
		);
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
				<div className='relative w-full sm:w-64'>
					<input
						type='text'
						placeholder='Search creators...'
						value={searchTerm}
						onChange={handleSearch}
						className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1 focus:outline-none focus:ring-2 focus:ring-primaryBrandColor'
					/>
					<FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
				</div>
				<div className='flex items-center bg-lightCardBg dark:bg-darkCardBg rounded-lg p-1'>
					<button
						onClick={() => setShowYoutube(true)}
						className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
							showYoutube
								? 'bg-primaryBrandColor text-white'
								: 'text-lightTextIcons1 dark:text-darkTextIcons1 hover:bg-gray-200 dark:hover:bg-gray-700'
						}`}
					>
						<FaYoutube className='mr-2' />
						YouTube
					</button>
					<button
						onClick={() => setShowYoutube(false)}
						className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
							!showYoutube
								? 'bg-primaryBrandColor text-white'
								: 'text-lightTextIcons1 dark:text-darkTextIcons1 hover:bg-gray-200 dark:hover:bg-gray-700'
						}`}
					>
						<FaInstagram className='mr-2' />
						Instagram
					</button>
				</div>
			</div>
			{renderContent()}
		</div>
	);
};

export default AllCreatorsContainer;
