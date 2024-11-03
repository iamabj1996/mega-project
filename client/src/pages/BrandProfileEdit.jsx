import React from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import customFetch from '../utils/customFetch';
import { FormRow } from '../components';
import { useDashboardContext } from './DashboardLayout';
import { toast } from 'react-toastify';
import { useBrandProfileContext } from './BrandProfileLayout';

const transformData = (data) => {
	return {
		ownedBy: data.ownedBy, // Add this statically or dynamically if needed
		logo: data.logo,
		brandName: data.brandName,
		tagline: data.tagline, // Provide a default tagline if missing
		description:
			data.description ||
			'Royal Threads specializes in high-quality, luxurious clothing made from the finest materials.',
		identity: {
			mission: data.mission,
			vision: data.vision,
			coreValues: data.coreValues.split(',').map((value) => value.trim()), // Split and trim
			personality: data.personality.split(',').map((value) => value.trim()),
		},
		socialMedia: {
			instagram: data.instagram,
			facebook: data.facebook,
			twitter: data.twitter,
			youtube: data.youtube,
		},
		communityEngagement: {
			collaborations: ['615f1a0f21c1f8e6b3e4c650', '615f1a0f21c1f8e6b3e4c651'], // Add these statically or update as needed
		},
		resources: {
			websiteLink: data.websiteLink,
		},
	};
};
export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const profileId = data.profileId;
	delete data.profileId;
	try {
		await customFetch.patch(`/brand_profile/${profileId}`, transformData(data));
		toast.success('Edit successful');
		return redirect('/dashboard/brand-profile');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

export default function BrandProfileEdit() {
	const { brandProfile } = useBrandProfileContext();
	const { user } = useDashboardContext();

	return (
		<div className='min-h-screen bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1'>
			<main className='container mx-auto px-4 py-12 space-y-16'>
				<h1 className='text-3xl font-bold mb-8 text-primaryBrandColor text-center'>
					Edit Brand Profile
				</h1>
				<Form method='post' className='space-y-12'>
					{/* Brand Overview Section */}
					<section className='bg-lightCardBg dark:bg-darkCardBg shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4'>
						<h2 className='text-2xl font-semibold mb-6 text-lightTextIcons1 dark:text-darkTextIcons1'>
							Brand Overview
						</h2>
						<div className='space-y-6'>
							<FormRow
								type='text'
								name='logo'
								labelText='Logo URL'
								defaultValue={brandProfile?.logo}
							/>
							<FormRow
								type='text'
								name='brandName'
								labelText='Brand Name'
								defaultValue={brandProfile?.brandName}
							/>
							<FormRow
								type='text'
								name='tagline'
								labelText='Tagline'
								defaultValue={brandProfile?.tagline}
							/>
							<div>
								<label
									htmlFor='description'
									className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
								>
									Description
								</label>
								<textarea
									name='description'
									id='description'
									rows={4}
									className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
									defaultValue={brandProfile?.description}
								/>
							</div>
						</div>
					</section>

					{/* Brand Identity Section */}
					<section className='bg-lightCardBg dark:bg-darkCardBg shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4'>
						<h2 className='text-2xl font-semibold mb-6 text-lightTextIcons1 dark:text-darkTextIcons1'>
							Brand Identity
						</h2>
						<div className='space-y-6'>
							<div>
								<label
									htmlFor='mission'
									className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
								>
									Mission Statement
								</label>
								<textarea
									name='mission'
									id='mission'
									rows={3}
									className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
									defaultValue={brandProfile?.identity?.mission}
								/>
							</div>
							<div>
								<label
									htmlFor='vision'
									className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
								>
									Vision Statement
								</label>
								<textarea
									name='vision'
									id='vision'
									rows={3}
									className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
									defaultValue={brandProfile?.identity?.vision}
								/>
							</div>
							<FormRow
								type='text'
								name='coreValues'
								labelText='Core Values (comma-separated)'
								defaultValue={brandProfile?.identity?.coreValues?.join(', ')}
							/>
							<FormRow
								type='text'
								name='personality'
								labelText='Brand Personality (comma-separated)'
								defaultValue={brandProfile?.identity?.personality?.join(', ')}
							/>
						</div>
					</section>

					{/* Social Media Section */}
					<section className='bg-lightCardBg dark:bg-darkCardBg shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4'>
						<h2 className='text-2xl font-semibold mb-6 text-lightTextIcons1 dark:text-darkTextIcons1'>
							Social Media
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormRow
								type='text'
								name='instagram'
								labelText='Instagram URL'
								defaultValue={brandProfile?.socialMedia?.instagram}
							/>
							<FormRow
								type='text'
								name='facebook'
								labelText='Facebook URL'
								defaultValue={brandProfile?.socialMedia?.facebook}
							/>
							<FormRow
								type='text'
								name='twitter'
								labelText='Twitter URL'
								defaultValue={brandProfile?.socialMedia?.twitter}
							/>
							<FormRow
								type='text'
								name='youtube'
								labelText='YouTube URL'
								defaultValue={brandProfile?.socialMedia?.youtube}
							/>
						</div>
					</section>

					{/* Website Link Section */}
					<section className='bg-lightCardBg dark:bg-darkCardBg shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4'>
						<h2 className='text-2xl font-semibold mb-6 text-lightTextIcons1 dark:text-darkTextIcons1'>
							Website
						</h2>
						<FormRow
							type='text'
							name='websiteLink'
							labelText='Website URL'
							defaultValue={brandProfile?.resources?.websiteLink}
						/>
					</section>

					<input type='hidden' name='ownedBy' value={user?._id} />
					<input
						type='hidden'
						name='profileId'
						defaultValue={brandProfile?._id}
					/>

					{/* Submit Button */}
					<div className='flex justify-center'>
						<button type='submit' className='main-btn flex items-center'>
							<FaSave className='mr-2' />
							<span>Save Changes</span>
						</button>
					</div>
				</Form>
			</main>
		</div>
	);
}
