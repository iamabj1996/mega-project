import React from 'react';
import {
	FaInstagram,
	FaUsers,
	FaImage,
	FaChartLine,
	FaPlusCircle,
	FaHeart,
	FaComment,
	FaShare,
	FaBookmark,
	FaLink,
} from 'react-icons/fa';
import { Form } from 'react-router-dom';
import { useSocialMediaContext } from '../pages/SocialMedia'; // Adjust import as needed

const InsightCard = ({ title, value, description, icon }) => (
	<div className='bg-lightCardBg dark:bg-darkCardBg rounded-lg shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg'>
		<div className='text-primaryBrandColor mb-3 text-3xl'>{icon}</div>
		<h3 className='text-lg font-semibold mb-2 text-center'>{title}</h3>
		<p className='text-3xl font-bold mb-3 text-primaryBrandColor'>{value}</p>
		<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2 text-center'>
			{description}
		</p>
	</div>
);

const NoDataPlaceholder = ({ isSubmitting }) => (
	<div className='flex flex-col items-center justify-center min-h-[60vh] bg-lightCardBg dark:bg-darkCardBg rounded-lg shadow-lg p-8'>
		<FaInstagram className='text-primaryBrandColor text-6xl mb-6' />
		<h2 className='text-2xl font-bold mb-4 text-center'>
			No Instagram Data Available
		</h2>
		<p className='text-lightTextIcons2 dark:text-darkTextIcons2 mb-8 text-center max-w-md'>
			Connect your Instagram account to view your creator insights and profile
			information.
		</p>
		<Form method='post'>
			<input type='hidden' name='platform' value='instagram' />
			<button className='bg-primaryBrandColor hover:bg-primaryBrandColor/90 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md'>
				<FaPlusCircle className='mr-2 h-5 w-5' />
				<span>
					{isSubmitting ? 'Retrieving Instagram Data...' : 'Add Instagram Data'}
				</span>
			</button>
		</Form>
	</div>
);

const getInsightIcon = (name) => {
	switch (name) {
		case 'reach':
			return <FaUsers />;
		case 'impressions':
			return <FaChartLine />;
		case 'profile_views':
			return <FaImage />;
		case 'likes':
			return <FaHeart />;
		case 'comments':
			return <FaComment />;
		case 'shares':
			return <FaShare />;
		case 'saves':
			return <FaBookmark />;
		default:
			return <FaInstagram />;
	}
};

export default function InstagramCreatorInfo() {
	const { instagramPages, isSubmitting } = useSocialMediaContext();

	return (
		<div className='min-h-screen bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1'>
			<div className='container mx-auto px-4 py-12'>
				{instagramPages.length === 0 ? (
					<NoDataPlaceholder isSubmitting={isSubmitting} />
				) : (
					<div>
						{instagramPages.map((page) => (
							<div
								key={page._id}
								className='bg-lightCardBg dark:bg-darkCardBg rounded-lg shadow-lg p-8 mb-12'
							>
								<div className='flex flex-col md:flex-row items-center md:items-start mb-8'>
									<div className='relative mb-6 md:mb-0 md:mr-8'>
										<img
											src={page.profilePicture}
											alt={page.creatorName}
											className='w-40 h-40 rounded-full object-cover border-4 border-primaryBrandColor shadow-lg'
										/>
										<div className='absolute bottom-0 right-0 bg-primaryBrandColor text-white rounded-full p-2'>
											<FaInstagram size={24} />
										</div>
									</div>
									<div className='text-center md:text-left flex-grow'>
										<h1 className='text-4xl font-bold mb-2 text-primaryBrandColor'>
											{page.creatorName}
										</h1>
										<p className='text-xl text-lightTextIcons2 dark:text-darkTextIcons2 mb-4'>
											@{page.creatorUserName}
										</p>
										<div className='flex flex-wrap justify-center md:justify-start gap-8'>
											<div className='text-center bg-lightMainBg dark:bg-darkMainBg rounded-lg p-4 shadow-md'>
												<p className='text-3xl font-bold text-primaryBrandColor'>
													{page.followerCount}
												</p>
												<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2'>
													Followers
												</p>
											</div>
											<div className='text-center bg-lightMainBg dark:bg-darkMainBg rounded-lg p-4 shadow-md'>
												<p className='text-3xl font-bold text-primaryBrandColor'>
													{page.followingCount}
												</p>
												<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2'>
													Following
												</p>
											</div>
											<div className='text-center bg-lightMainBg dark:bg-darkMainBg rounded-lg p-4 shadow-md'>
												<p className='text-3xl font-bold text-primaryBrandColor'>
													{page.mediaCount}
												</p>
												<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2'>
													Posts
												</p>
											</div>
										</div>
									</div>
								</div>

								<h2 className='text-3xl font-bold mt-12 mb-6 text-center text-primaryBrandColor'>
									Creator Insights
								</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
									{page.insights.map((insight) => (
										<InsightCard
											key={insight._id}
											title={insight.title}
											value={insight.total_value.value.toLocaleString()}
											description={insight.description}
											icon={getInsightIcon(insight.name)}
										/>
									))}
								</div>
							</div>
						))}

						<div className='flex items-center justify-center mt-12'>
							<Form method='post'>
								<input type='hidden' name='platform' value='instagram' />
								<button className='bg-primaryBrandColor hover:bg-primaryBrandColor/90 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md'>
									<FaPlusCircle className='mr-2 h-5 w-5' />
									<span>
										{isSubmitting
											? 'Retrieving Instagram Data...'
											: 'Add Another Instagram Account'}
									</span>
								</button>
							</Form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
