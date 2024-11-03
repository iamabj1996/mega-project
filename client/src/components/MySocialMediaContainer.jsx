import React from 'react';
import { Form } from 'react-router-dom';
import {
	FaPlusCircle,
	FaYoutube,
	FaEye,
	FaClock,
	FaThumbsUp,
	FaUsers,
} from 'react-icons/fa';
import { LuMessageSquare } from 'react-icons/lu';
import { useSocialMediaContext } from '../pages/SocialMedia';

const InsightCard = ({ title, value, icon }) => (
	<div className='bg-lightCardBg dark:bg-darkCardBg rounded-lg shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg'>
		<div className='text-primaryBrandColor mb-2'>{icon}</div>
		<h3 className='text-lg font-semibold mb-1'>{title}</h3>
		<p className='text-2xl font-bold'>{value}</p>
	</div>
);

const MySocialMediaContainer = () => {
	const { youtubeChannels, isSubmitting } = useSocialMediaContext();
	if (youtubeChannels.length === 0) {
		return (
			<div className='bg-lightCardBg dark:bg-darkCardBg shadow-md rounded-lg text-center p-8'>
				<FaYoutube className='mx-auto h-16 w-16 text-red-500 mb-4' />
				<p className='text-xl mb-6'>No YouTube channel data available.</p>
				<Form method='post'>
					<input type='hidden' name='platform' value='youtube' />
					<button className='bg-primaryBrandColor hover:bg-primaryBrandColor/90 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105'>
						<FaPlusCircle className='mr-2 h-5 w-5' />
						<span>
							{isSubmitting ? 'Retrieving Channel Data...' : 'Add Channel Data'}
						</span>
					</button>
				</Form>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			{youtubeChannels.map((channel, index) => (
				<div
					key={index}
					className='bg-lightCardBg dark:bg-darkCardBg shadow-md rounded-lg overflow-hidden'
				>
					<div className='bg-primaryBrandColor text-white p-6'>
						<div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
							<img
								src={channel.channelLogo}
								alt={channel.name}
								className='w-20 h-20 rounded-full border-4 border-white'
							/>
							<div className='text-center sm:text-left'>
								<h2 className='text-2xl font-bold'>{channel.name}</h2>
								<p className='text-red-100'>
									{channel.subscribers} subscribers
								</p>
							</div>
						</div>
					</div>
					<div className='p-6'>
						<div className='flex flex-wrap gap-2 mb-4'>
							{channel.category?.map((cat, catIndex) => (
								<span
									key={catIndex}
									className='bg-primaryBrandColor text-darkTextIcons1 px-3 py-1 rounded-full text-sm'
								>
									{cat}
								</span>
							))}
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
							<InsightCard
								title='Upload Frequency'
								value={channel.uploadFrequency}
								icon={<FaClock className='h-6 w-6' />}
							/>
							<InsightCard
								title='Avg. Views'
								value={channel.avgViews}
								icon={<FaEye className='h-6 w-6' />}
							/>
							<InsightCard
								title='Subscribers'
								value={channel.subscribers}
								icon={<FaUsers className='h-6 w-6' />}
							/>
							<InsightCard
								title='Total Videos'
								value={channel.videoData.length.toString()}
								icon={<FaYoutube className='h-6 w-6' />}
							/>
						</div>
						<h3 className='text-xl font-semibold mb-4'>Recent Videos</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							{channel.videoData?.map((video) => (
								<div
									key={video._id}
									className='bg-lightMainBg dark:bg-darkMainBg rounded-lg shadow overflow-hidden'
								>
									<img
										src={video.thumbnail}
										alt={video.title}
										className='w-full h-48 object-cover'
									/>
									<div className='p-4'>
										<h4 className='font-semibold mb-2 line-clamp-2 text-lightTextIcons1 dark:text-darkTextIcons1'>
											{video.title}
										</h4>
										<div className='flex justify-between text-sm text-lightTextIcons2 dark:text-darkTextIcons2'>
											<div className='flex items-center space-x-2'>
												<FaEye className='h-4 w-4' />
												<span>{video.viewCount}</span>
											</div>
											<div className='flex items-center space-x-2'>
												<FaThumbsUp className='h-4 w-4' />
												<span>{video.likeCount}</span>
											</div>
											<div className='flex items-center space-x-2'>
												<LuMessageSquare className='h-4 w-4' />
												<span>{video.commentCount}</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
			<Form className='text-center mt-8' method='post'>
				<input type='hidden' name='platform' value='youtube' />
				<button className='bg-primaryBrandColor hover:bg-primaryBrandColor/90 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105'>
					<FaPlusCircle className='mr-2 h-5 w-5' />
					<span>
						{isSubmitting ? 'Retrieving Channel Data...' : 'Add Channel Data'}
					</span>
				</button>
			</Form>
		</div>
	);
};

export default MySocialMediaContainer;
