import React, { useState, createContext, useContext } from 'react';
import { useLoaderData, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { MySocialMediaContainer } from '../components';
import InstagramCreatorInfo from './InstagramCreatorInfo';
import { FaYoutube, FaInstagram } from 'react-icons/fa';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/youtube_channels');
		const { youtubeChannels } = data;
		const data1 = await customFetch.get('/instagram');
		const { instagramPages } = data1.data;
		return { youtubeChannels, instagramPages };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return redirect('/login');
	}
};

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		if (data.platform === 'youtube') {
			const { data } = await customFetch.get('/youtube_channels/auth');
			window.location.href = data.url;
		} else if (data.platform === 'instagram') {
			const { data } = await customFetch.get('/instagram/auth');
			window.location.href = data.url;
		}
		return null;
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		console.error('Error adding channel data:', error);
		return error;
	}
};

const SocialMediaContext = createContext();

const PlatformSwitch = ({ platform, togglePlatform }) => (
	<div className='flex justify-center mb-6'>
		<div className='flex items-center bg-lightCardBg dark:bg-darkCardBg rounded-lg p-1 shadow-md'>
			<button
				onClick={() => togglePlatform('youtube')}
				className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
					platform === 'youtube'
						? 'bg-primaryBrandColor text-white'
						: 'text-lightTextIcons1 dark:text-darkTextIcons1 hover:bg-gray-200 dark:hover:bg-gray-700'
				}`}
			>
				<FaYoutube className='mr-2' />
				YouTube
			</button>
			<button
				onClick={() => togglePlatform('instagram')}
				className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
					platform === 'instagram'
						? 'bg-primaryBrandColor text-white'
						: 'text-lightTextIcons1 dark:text-darkTextIcons1 hover:bg-gray-200 dark:hover:bg-gray-700'
				}`}
			>
				<FaInstagram className='mr-2' />
				Instagram
			</button>
		</div>
	</div>
);

export default function SocialMediaChannelManagement() {
	const { youtubeChannels, instagramPages } = useLoaderData();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const [platform, setPlatform] = useState('youtube');

	const togglePlatform = (newPlatform) => {
		setPlatform(newPlatform);
	};

	return (
		<SocialMediaContext.Provider
			value={{
				platform,
				togglePlatform,
				youtubeChannels,
				isSubmitting,
				instagramPages,
			}}
		>
			<div className='min-h-screen py-1 px-4 sm:px-6 lg:px-8 select-none'>
				<div className='max-w-7xl mx-auto mt-4'>
					<PlatformSwitch platform={platform} togglePlatform={togglePlatform} />
					{platform === 'youtube' && <MySocialMediaContainer />}
					{platform === 'instagram' && <InstagramCreatorInfo />}
				</div>
			</div>
		</SocialMediaContext.Provider>
	);
}

export const useSocialMediaContext = () => useContext(SocialMediaContext);
