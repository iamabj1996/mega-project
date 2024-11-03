import { FaEye, FaClock, FaThumbsUp } from 'react-icons/fa';
import { LuMessageSquare } from 'react-icons/lu';
import { IoPeopleSharp } from 'react-icons/io5';

const SingleYtChannelComponent = ({
	channelLogo = '',
	name = '',
	subscribers = '',
	category = [],
	uploadFrequency = '',
	avgViews = '',
	videoData = [],
}) => {
	return (
		<div className='bg-lightCardBg dark:bg-darkCardBg shadow-md rounded-lg overflow-hidden'>
			<div className='bg-primaryBrandColor text-white p-6'>
				<div className='flex items-center space-x-4'>
					<img
						src={channelLogo}
						alt={name}
						className='w-20 h-20 rounded-full border-4 border-white'
					/>
					<div>
						<h2 className='text-2xl font-bold'>{name}</h2>
						<div className='text-red-100 flex items-center space-x-1'>
							<IoPeopleSharp />
							<p>{subscribers}</p>
						</div>
					</div>
				</div>
			</div>
			<div className='p-6'>
				<div className='flex flex-wrap gap-2 mb-4'>
					{category?.map((cat, catIndex) => (
						<span
							key={catIndex}
							className='bg-primaryBrandColor text-darkTextIcons1 px-3 py-1 rounded-full text-sm'
						>
							{cat}
						</span>
					))}
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6'>
					<div className='flex items-center space-x-2'>
						<FaClock className='h-5 w-5' />
						<span>{uploadFrequency}</span>
					</div>
					<div className='flex items-center space-x-2'>
						<FaEye className='h-5 w-5' />
						<span>Avg. {avgViews} views</span>
					</div>
				</div>
				<h3 className='text-xl font-semibold mb-4'>Recent Videos</h3>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{videoData?.map((video) => (
						<div
							key={video._id}
							className='bg-gray-50 rounded-lg shadow overflow-hidden'
						>
							<img
								src={video.thumbnail}
								alt={video.title}
								className='w-full h-48 object-cover'
							/>
							<div className='p-4'>
								<h4 className='font-semibold mb-2 line-clamp-2 text-gray-800'>
									{video.title}
								</h4>
								<div className='flex justify-between text-sm text-gray-800'>
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
	);
};

export default SingleYtChannelComponent;
