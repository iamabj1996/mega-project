import { FaYoutube, FaInstagram } from 'react-icons/fa';
import { useSocialMediaContext } from '../pages/SocialMedia';

const SocialMediaSwitch = () => {
	const { platform, togglePlatform } = useSocialMediaContext();
	return (
		<div className='flex justify-center mb-8'>
			<div
				className='relative w-64 h-12 bg-gray-200 rounded-full cursor-pointer'
				onClick={togglePlatform}
			>
				<div
					className={`absolute top-1 left-0 w-32 h-10 bg-white rounded-full shadow-lg transition-transform duration-300 ease-in-out ${
						platform === 'youtube'
							? 'transform translate-x-0'
							: 'transform translate-x-full'
					}`}
				></div>
				<div className='absolute inset-0 flex items-center justify-around'>
					<div
						className={`flex items-center ${
							platform === 'youtube' ? 'text-red-500' : 'text-gray-500'
						}`}
					>
						<FaYoutube className='mr-2' />
						YouTube
					</div>
					<div
						className={`flex items-center ${
							platform === 'instagram' ? 'text-pink-500' : 'text-gray-500'
						}`}
					>
						<FaInstagram className='mr-2' />
						Instagram
					</div>
				</div>
			</div>
		</div>
	);
};
export default SocialMediaSwitch;
