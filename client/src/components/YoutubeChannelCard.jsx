import { Link } from 'react-router-dom';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { PiUploadSimple } from 'react-icons/pi';
import { FaEarthAsia } from 'react-icons/fa6';
import { HiCurrencyDollar } from 'react-icons/hi2';

const YoutubeChannelCard = ({
	_id = '',
	name = '',
	category = '',
	subscribers = '',
	avgViews = '',
	engagement = '',
	uploadFrequency = '',
	demographics = '',
	collaborations = [],
	cpm = '',
	channelLogo = '',
}) => {
	const avatarText = name ? name.charAt(0).toUpperCase() : '?';
	return (
		<div className='bg-lightCardBg dark:bg-darkCardBg shadow-lg rounded-lg overflow-hidden w-full'>
			<div className='p-6'>
				<div className='flex items-center gap-4 mb-6'>
					<div className='w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center'>
						{name ? (
							<img
								src={
									channelLogo
										? channelLogo
										: `/placeholder.svg?height=64&width=64&text=${avatarText}`
								}
								alt={`${name} avatar`}
								className='w-full h-full object-cover'
							/>
						) : (
							<span className='text-2xl font-bold text-gray-400'>
								{avatarText}
							</span>
						)}
					</div>
					<div>
						<Link
							to={`/dashboard/search-creators/${_id}`}
							className='text-xl font-bold text-primaryBrandColor'
						>
							{name || 'Unknown Channel'}
						</Link>

						{/* Mapping through category array */}
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{category && category.length > 0
								? category.map((cat, index) => (
										<span key={index} className='mr-2'>
											{cat}
											{index < category.length - 1 ? ',' : ''}
										</span>
								  ))
								: 'Uncategorized'}
						</p>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-4 mb-6'>
					<div className='flex items-center gap-2'>
						<BsFillPeopleFill className='h-5 w-5 text-gray-400' />
						<span className='text-sm font-medium'>
							{subscribers
								? `${subscribers} Subscribers`
								: 'No subscriber data'}
						</span>
					</div>
					<div className='flex items-center gap-2'>
						<FaVideo className='h-5 w-5 text-gray-400' />
						<span className='text-sm font-medium'>
							{avgViews ? `${avgViews} Avg. Views` : 'No view data'}
						</span>
					</div>
					<div className='flex items-center gap-2'>
						<AiFillLike className='h-5 w-5 text-gray-400' />
						<span className='text-sm font-medium'>
							{engagement ? `${engagement} Engagement` : 'No engagement data'}
						</span>
					</div>
					<div className='flex items-center gap-2'>
						<PiUploadSimple className='h-5 w-5 text-gray-400' />
						<span className='text-sm font-medium'>
							{uploadFrequency
								? `${uploadFrequency} Uploads`
								: 'No upload data'}
						</span>
					</div>
				</div>

				<div className='mb-6'>
					<h3 className='font-semibold mb-2'>Audience Demographics</h3>
					<div className='flex items-center gap-2'>
						<FaEarthAsia className='h-5 w-5 text-gray-400' />
						<span className='text-sm'>
							{demographics || 'No demographic data'}
						</span>
					</div>
				</div>

				<div className='mb-6'>
					<h3 className='font-semibold mb-2'>Past Collaborations</h3>
					<div className='flex flex-wrap gap-2'>
						{collaborations.length > 0 ? (
							collaborations.map((brand, index) => (
								<span
									key={index}
									className='bg-primaryBrandColor text-darkTextIcons1 text-xs px-2 py-1 rounded-full'
								>
									{brand}
								</span>
							))
						) : (
							<span className='text-sm text-gray-500'>
								No collaboration data
							</span>
						)}
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<HiCurrencyDollar className='h-5 w-5 text-gray-400' />
					<span className='text-sm font-medium'>
						{cpm ? `${cpm} CPM (estimated)` : 'No CPM data'}
					</span>
				</div>

				<div className='flex flex-col items-center mt-4'>
					<button className='main-btn w-1/2 hover:bg-primaryBrandColor/90'>
						Contact Channel
					</button>
				</div>
			</div>
		</div>
	);
};
export default YoutubeChannelCard;
