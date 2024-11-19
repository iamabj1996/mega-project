import React from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

const BrandSubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white dark:bg-darkCardBg rounded-lg p-8 max-w-md w-full m-4'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-2xl font-bold text-primaryBrandColor'>
						Paid Subscription
					</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 transition-colors'
						aria-label='Close modal'
					>
						<FaTimes size={24} />
					</button>
				</div>

				<div className='mb-6'>
					<p className='text-3xl font-bold text-center mb-2'>₹499</p>
					<p className='text-center text-gray-600 dark:text-gray-300'>
						Enjoy all exclusive offers
					</p>
				</div>

				<ul className='mb-6 space-y-2'>
					{[
						'Create Contact with creator',
						'Create contracts',
						'Create campaign',
					].map((benefit, index) => (
						<li key={index} className='flex items-center'>
							<FaCheck className='text-green-500 mr-2' />
							<span className='text-gray-700 dark:text-gray-200'>
								{benefit}
							</span>
						</li>
					))}
				</ul>

				<button
					onClick={onSubscribe}
					className='w-full bg-primaryBrandColor hover:bg-primaryBrandColor/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105'
				>
					Subscribe Now
				</button>

				<p className='text-xs text-center mt-4 text-gray-500 dark:text-gray-400'>
					By subscribing, you agree to our Terms of Service and Privacy Policy.
				</p>
			</div>
		</div>
	);
};

export default BrandSubscriptionModal;
