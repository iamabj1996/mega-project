import React from 'react';
import {
	FaInstagram,
	FaUsers,
	FaImage,
	FaHeart,
	FaComment,
	FaShare,
	FaBookmark,
	FaLink,
} from 'react-icons/fa';

const InsightItem = ({ title, value, icon }) => (
	<div className='flex items-center p-2 bg-lightMainBg dark:bg-darkMainBg rounded-lg shadow-sm'>
		<div className='text-primaryBrandColor mr-3'>{icon}</div>
		<div>
			<h4 className='text-xs font-semibold text-lightTextIcons1 dark:text-darkTextIcons1'>
				{title}
			</h4>
			<p className='text-sm font-bold text-primaryBrandColor'>
				{value.toLocaleString()}
			</p>
		</div>
	</div>
);

const getInsightIcon = (title) => {
	switch (title.toLowerCase()) {
		case 'accounts reached':
			return <FaUsers size={20} />;
		case 'content interactions':
			return <FaHeart size={20} />;
		case 'accounts engaged':
			return <FaUsers size={20} />;
		case 'likes':
			return <FaHeart size={20} />;
		case 'comments':
			return <FaComment size={20} />;
		case 'shares':
			return <FaShare size={20} />;
		case 'saves':
			return <FaBookmark size={20} />;
		case 'replies':
			return <FaComment size={20} />;
		case 'profile links taps':
			return <FaLink size={20} />;
		default:
			return <FaInstagram size={20} />;
	}
};

const InstagramCreatorCard = ({
	_id,
	creatorName,
	creatorUserName,
	profilePicture,
	followerCount,
	followingCount,
	mediaCount,
	insights,
}) => {
	return (
		<div className='bg-lightCardBg dark:bg-darkCardBg shadow-lg rounded-lg overflow-hidden w-full'>
			<div className='p-4 sm:p-6'>
				<div className='flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-6'>
					<div className='relative mb-4 sm:mb-0 sm:mr-6'>
						<img
							src={profilePicture}
							alt={creatorName}
							className='w-24 h-24 rounded-full object-cover border-4 border-primaryBrandColor'
						/>
						<div className='absolute bottom-0 right-0 bg-primaryBrandColor text-white rounded-full p-1'>
							<FaInstagram size={16} />
						</div>
					</div>
					<div className='text-center sm:text-left'>
						<h2 className='text-xl font-bold text-primaryBrandColor cursor-pointer'>
							{creatorName}
						</h2>
						<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2 mb-2'>
							@{creatorUserName}
						</p>
						<div className='flex justify-center sm:justify-start space-x-4'>
							<div className='text-center'>
								<p className='font-semibold text-primaryBrandColor'>
									{followerCount.toLocaleString()}
								</p>
								<p className='text-xs text-lightTextIcons2 dark:text-darkTextIcons2'>
									Followers
								</p>
							</div>
							<div className='text-center'>
								<p className='font-semibold text-primaryBrandColor'>
									{followingCount.toLocaleString()}
								</p>
								<p className='text-xs text-lightTextIcons2 dark:text-darkTextIcons2'>
									Following
								</p>
							</div>
							<div className='text-center'>
								<p className='font-semibold text-primaryBrandColor'>
									{mediaCount.toLocaleString()}
								</p>
								<p className='text-xs text-lightTextIcons2 dark:text-darkTextIcons2'>
									Posts
								</p>
							</div>
						</div>
					</div>
				</div>

				<h3 className='text-lg font-semibold mb-3 text-lightTextIcons1 dark:text-darkTextIcons1'>
					Insights
				</h3>
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4'>
					{insights.map((insight, index) => (
						<InsightItem
							key={index}
							title={insight.title}
							value={insight.total_value.value}
							icon={getInsightIcon(insight.title)}
						/>
					))}
				</div>

				<div className='flex justify-center'>
					<button className='main-btn w-1/2 hover:bg-primaryBrandColor/90'>
						Contact Creator
					</button>
				</div>
			</div>
		</div>
	);
};

export default InstagramCreatorCard;
