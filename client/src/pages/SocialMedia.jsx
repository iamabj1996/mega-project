import { useState, useEffect, createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import { useLoaderData, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MySocialMediaContainer, SocialMediaSwitch } from '../components';
import InstagramCreatorInfo from './InstagramCreatorInfo';

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
	console.log('insideData', data);
	try {
		if (data.platform === 'youtube') {
			// YouTube platform-specific logic
			const { data } = await customFetch.get('/youtube_channels/auth');
			window.location.href = data.url;
		} else if (data.platform === 'instagram') {
			// Instagram platform-specific logic
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

export default function SocialMediaChannelManagement() {
	const { youtubeChannels, instagramPages } = useLoaderData();
	console.log('data', youtubeChannels);
	console.log('data', instagramPages);
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const [platform, setPlatform] = useState('youtube');

	console.log('platform', platform);

	const togglePlatform = () => {
		setTimeout(() => {
			setPlatform(platform === 'youtube' ? 'instagram' : 'youtube');
		}, 300);
	};

	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty(
			'--platform-color',
			platform === 'youtube' ? '#FF0000' : '#E1306C'
		);
	}, [platform]);

	return (
		<SocialMediaContext.Provider
			value={{
				platform,
				togglePlatform,
				youtubeChannels,
				isSubmitting,
				instagramPages,
			}}
			className='min-h-screen py-1 px-4 sm:px-6 lg:px-8 select-none '
		>
			<div className='max-w-7xl mx-auto mt-4'>
				<SocialMediaSwitch />
				{platform === 'youtube' && <MySocialMediaContainer />}
				{platform === 'instagram' && <InstagramCreatorInfo />}
			</div>
		</SocialMediaContext.Provider>
	);
}

export const useSocialMediaContext = () => useContext(SocialMediaContext);
