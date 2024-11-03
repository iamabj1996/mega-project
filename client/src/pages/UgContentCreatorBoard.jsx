import React from 'react';
import {
	FiDollarSign,
	FiEye,
	FiThumbsUp,
	FiMessageSquare,
	FiCalendar,
	FiClock,
	FiArrowRight,
} from 'react-icons/fi';

export default function UgContentCreatorBoard() {
	// Mock data for demonstration
	const activeCampaigns = [
		{
			id: 1,
			title: 'Summer Fashion Haul',
			platform: 'Instagram',
			deliverables: '3 Posts, 2 Stories',
			daysLeft: 5,
		},
		{
			id: 2,
			title: 'Tech Gadget Review',
			platform: 'YouTube',
			deliverables: '1 Video',
			daysLeft: 10,
		},
	];

	const recommendedCampaigns = [
		{
			id: 3,
			title: 'Fitness Challenge',
			platform: 'Instagram, YouTube',
			type: 'Sponsored Content',
			payment: 'Performance-based',
			deadline: '2023-08-15',
		},
		{
			id: 4,
			title: 'Eco-Friendly Product Launch',
			platform: 'Instagram',
			type: 'Product Review',
			payment: 'Flat Fee',
			deadline: '2023-08-20',
		},
		{
			id: 5,
			title: 'Travel Vlog Series',
			platform: 'YouTube',
			type: 'Sponsored Content',
			payment: 'Revenue Sharing',
			deadline: '2023-09-01',
		},
	];

	return (
		<div className='bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1 min-h-screen p-4 md:p-8'>
			<h1 className='text-3xl font-bold mb-6'>Creator Dashboard</h1>

			{/* Dashboard Overview */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
				<DashboardCard
					title='Active Campaigns'
					value={activeCampaigns.length}
					icon={FiCalendar}
				/>
				<DashboardCard
					title='Total Earnings'
					value='$5,230'
					icon={FiDollarSign}
				/>
				<DashboardCard
					title='Avg. Engagement Rate'
					value='8.5%'
					icon={FiThumbsUp}
				/>
				<DashboardCard title='Total Views' value='1.2M' icon={FiEye} />
			</div>

			{/* Active Campaigns */}
			<section className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4'>Active Campaigns</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{activeCampaigns.map((campaign) => (
						<ActiveCampaignCard key={campaign.id} campaign={campaign} />
					))}
				</div>
			</section>

			{/* Recommended Campaigns */}
			<section>
				<h2 className='text-2xl font-semibold mb-4'>Recommended Campaigns</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{recommendedCampaigns.map((campaign) => (
						<RecommendedCampaignCard key={campaign.id} campaign={campaign} />
					))}
				</div>
			</section>
		</div>
	);
}

function DashboardCard({ title, value, icon: Icon }) {
	return (
		<div className='bg-white dark:bg-darkCardBg rounded-lg shadow-md p-6'>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
					{title}
				</h3>
				<Icon className='h-5 w-5 text-primaryBrandColor' />
			</div>
			<div className='text-2xl font-bold'>{value}</div>
		</div>
	);
}

function ActiveCampaignCard({ campaign }) {
	return (
		<div className='bg-white dark:bg-darkCardBg rounded-lg shadow-md p-6'>
			<h3 className='text-lg font-semibold mb-2'>{campaign.title}</h3>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
				Platform: {campaign.platform}
			</p>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
				Deliverables: {campaign.deliverables}
			</p>
			<div className='flex justify-between items-center mt-4'>
				<span className='text-sm font-medium text-primaryBrandColor'>
					<FiClock className='inline mr-1' />
					{campaign.daysLeft} days left
				</span>
				<button className='px-3 py-1 bg-primaryBrandColor text-white rounded-md hover:bg-opacity-90 transition-colors duration-200'>
					Upload Content
				</button>
			</div>
		</div>
	);
}

function RecommendedCampaignCard({ campaign }) {
	return (
		<div className='bg-white dark:bg-darkCardBg rounded-lg shadow-md p-6'>
			<h3 className='text-lg font-semibold mb-2'>{campaign.title}</h3>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
				Platform: {campaign.platform}
			</p>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
				Type: {campaign.type}
			</p>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
				Payment: {campaign.payment}
			</p>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
				<FiCalendar className='inline mr-1' />
				Deadline: {campaign.deadline}
			</p>
			<button className='w-full px-4 py-2 bg-primaryBrandColor text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center'>
				View Details
				<FiArrowRight className='ml-2' />
			</button>
		</div>
	);
}
