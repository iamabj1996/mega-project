import React, { useState } from 'react';
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
	FaTrash,
} from 'react-icons/fa';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useSocialMediaContext } from '../pages/SocialMedia'; // Adjust import as needed
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

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
		{/* <FaInstagram className='text-primaryBrandColor text-6xl mb-6' /> */}
		<h2 className='text-2xl font-bold mb-4 text-center'>
			No Instagram Data Available
		</h2>
		<p className='text-lightTextIcons2 dark:text-darkTextIcons2 mb-8 text-center max-w-md'>
			Connect your Instagram account to view your creator insights and profile
			information.
		</p>
		<Form method='post' className='flex flex-col items-center'>
			<input type='hidden' name='platform' value='instagram' />
			<button className='bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-5 h-5 mr-2'
				>
					<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
				</svg>
				<span>{isSubmitting ? 'Logging in...' : 'Login with Facebook'}</span>
			</button>
			<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2 mt-2 text-center'>
				To add Instagram Creator Account{' '}
				<Link
					to='/privacy-policy'
					className='text-xs text-primaryBrandColor hover:underline'
				>
					Privacy Policy
				</Link>
			</p>
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

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white dark:bg-darkCardBg rounded-lg p-8 max-w-md w-full'>
				<h2 className='text-2xl font-bold mb-4 text-primaryBrandColor'>
					Confirm Deletion
				</h2>
				<p className='mb-6 text-lightTextIcons1 dark:text-darkTextIcons1'>
					Do you want to delete this creator account? Doing so will delete all
					the information about this page/creator from our database.
				</p>
				<div className='flex justify-end space-x-4'>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
					>
						Confirm Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default function InstagramCreatorInfo() {
	const { instagramPages, isSubmitting } = useSocialMediaContext();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [accountToDelete, setAccountToDelete] = useState(null);
	const navigate = useNavigate();

	const handleDeleteClick = (account) => {
		setAccountToDelete(account);
		setIsDeleteModalOpen(true);
	};

	const handleDeleteConfirm = async (id) => {
		console.log('id', id);
		try {
			await customFetch.delete(`/instagram/${id}`);
			toast.success('Instagram creator data has been deleted permanently');
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		}
		setIsDeleteModalOpen(false);
		setAccountToDelete(null);
		navigate('/dashboard');
	};

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
								className='bg-lightCardBg dark:bg-darkCardBg rounded-lg shadow-lg p-8 mb-12 relative'
							>
								<button
									onClick={() => handleDeleteClick(page)}
									className='absolute top-4 right-4 text-red-500 hover:text-red-600 transition-colors'
									aria-label='Delete account'
								>
									<FaTrash size={20} />
								</button>
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

						<div className='flex flex-col items-center justify-center mt-12'>
							<Form method='post'>
								<input type='hidden' name='platform' value='instagram' />
								<button className='bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='w-5 h-5 mr-2'
									>
										<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
									</svg>
									<span>
										{isSubmitting ? 'Logging in...' : 'Login with Facebook'}
									</span>
								</button>
							</Form>
							<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2 mt-2 text-center'>
								To add more Instagram Creator Account{' '}
								<Link
									to='/privacy-policy'
									className='text-xs text-primaryBrandColor hover:underline'
								>
									Privacy Policy
								</Link>
							</p>
						</div>
					</div>
				)}
			</div>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={() => handleDeleteConfirm(accountToDelete._id)} // Pass correct ID
			/>
		</div>
	);
}
