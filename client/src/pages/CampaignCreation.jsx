import React, { useState } from 'react';
import {
	FiChevronRight,
	FiChevronLeft,
	FiCheck,
	FiUpload,
	FiCalendar,
	FiDollarSign,
	FiTarget,
	FiUsers,
	FiFileText,
	FiMessageSquare,
	FiLock,
} from 'react-icons/fi';

const steps = [
	'Campaign Overview',
	'Content Requirements',
	'Target Audience',
	'Budget & Timeline',
	'Legal & Compliance',
];

export default function CampaignCreation() {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const nextStep = () =>
		setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
	const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

	return (
		<div className='bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1 min-h-screen p-4 md:p-8'>
			<h1 className='text-3xl font-bold mb-6'>Create New Campaign</h1>

			{/* Progress Bar */}
			<div className='mb-8'>
				<div className='flex justify-between'>
					{steps.map((step, index) => (
						<div key={index} className='flex flex-col items-center'>
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${
									index <= currentStep
										? 'bg-primaryBrandColor text-white'
										: 'bg-gray-300 dark:bg-gray-700'
								}`}
							>
								{index < currentStep ? <FiCheck /> : index + 1}
							</div>
							<span className='text-xs mt-2 hidden md:block'>{step}</span>
						</div>
					))}
				</div>
				<div className='mt-2 h-2 bg-gray-300 dark:bg-gray-700'>
					<div
						className='h-full bg-primaryBrandColor transition-all duration-300 ease-in-out'
						style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
					></div>
				</div>
			</div>

			{/* Form Steps */}
			<div className='bg-white dark:bg-darkCardBg rounded-lg shadow-md p-6'>
				{currentStep === 0 && (
					<div>
						<h2 className='text-xl font-semibold mb-4'>Campaign Overview</h2>
						<div className='space-y-4'>
							<div>
								<label htmlFor='campaignTitle' className='block mb-1'>
									Campaign Title
								</label>
								<input
									type='text'
									id='campaignTitle'
									name='campaignTitle'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									placeholder='Enter campaign title'
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='campaignType' className='block mb-1'>
									Campaign Type
								</label>
								<select
									id='campaignType'
									name='campaignType'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									onChange={handleInputChange}
								>
									<option value=''>Select campaign type</option>
									<option value='productReview'>Product Review</option>
									<option value='sponsoredContent'>Sponsored Content</option>
									<option value='viralChallenge'>Viral Challenge</option>
									<option value='contestGiveaway'>Contest/Giveaway</option>
									<option value='eventPromotion'>Event Promotion</option>
								</select>
							</div>
							<div>
								<label htmlFor='campaignObjective' className='block mb-1'>
									Campaign Objective
								</label>
								<select
									id='campaignObjective'
									name='campaignObjective'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									onChange={handleInputChange}
								>
									<option value=''>Select campaign objective</option>
									<option value='brandAwareness'>Brand Awareness</option>
									<option value='leadGeneration'>Lead Generation</option>
									<option value='userEngagement'>User Engagement</option>
									<option value='sales'>Sales</option>
								</select>
							</div>
						</div>
					</div>
				)}

				{currentStep === 1 && (
					<div>
						<h2 className='text-xl font-semibold mb-4'>Content Requirements</h2>
						<div className='space-y-4'>
							<div>
								<label className='block mb-1'>Platforms</label>
								<div className='space-x-4'>
									<label className='inline-flex items-center'>
										<input
											type='checkbox'
											name='platforms'
											value='instagram'
											className='form-checkbox'
											onChange={handleInputChange}
										/>
										<span className='ml-2'>Instagram</span>
									</label>
									<label className='inline-flex items-center'>
										<input
											type='checkbox'
											name='platforms'
											value='youtube'
											className='form-checkbox'
											onChange={handleInputChange}
										/>
										<span className='ml-2'>YouTube</span>
									</label>
								</div>
							</div>
							<div>
								<label className='block mb-1'>Deliverable Type</label>
								<div className='space-x-4'>
									<label className='inline-flex items-center'>
										<input
											type='checkbox'
											name='deliverableType'
											value='post'
											className='form-checkbox'
											onChange={handleInputChange}
										/>
										<span className='ml-2'>Post</span>
									</label>
									<label className='inline-flex items-center'>
										<input
											type='checkbox'
											name='deliverableType'
											value='story'
											className='form-checkbox'
											onChange={handleInputChange}
										/>
										<span className='ml-2'>Story</span>
									</label>
									<label className='inline-flex items-center'>
										<input
											type='checkbox'
											name='deliverableType'
											value='reel'
											className='form-checkbox'
											onChange={handleInputChange}
										/>
										<span className='ml-2'>Reel</span>
									</label>
									<label className='inline-flex items-center'>
										<input
											type='checkbox'
											name='deliverableType'
											value='video'
											className='form-checkbox'
											onChange={handleInputChange}
										/>
										<span className='ml-2'>Video</span>
									</label>
								</div>
							</div>
							<div>
								<label htmlFor='deliverableCount' className='block mb-1'>
									Number of Deliverables
								</label>
								<input
									type='number'
									id='deliverableCount'
									name='deliverableCount'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									placeholder='Enter number of deliverables'
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='contentStyle' className='block mb-1'>
									Content Style & Tone
								</label>
								<select
									id='contentStyle'
									name='contentStyle'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									onChange={handleInputChange}
								>
									<option value=''>Select content style</option>
									<option value='fun'>Fun</option>
									<option value='informative'>Informative</option>
									<option value='emotional'>Emotional</option>
									<option value='luxury'>Luxury</option>
									<option value='minimalist'>Minimalist</option>
								</select>
							</div>
						</div>
					</div>
				)}

				{currentStep === 2 && (
					<div>
						<h2 className='text-xl font-semibold mb-4'>
							Target Audience & Creators
						</h2>
						<div className='space-y-4'>
							<div>
								<label className='block mb-1'>
									Target Audience Demographics
								</label>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label htmlFor='ageRange' className='block mb-1'>
											Age Range
										</label>
										<input
											type='text'
											id='ageRange'
											name='ageRange'
											className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
											placeholder='e.g., 18-35'
											onChange={handleInputChange}
										/>
									</div>
									<div>
										<label htmlFor='gender' className='block mb-1'>
											Gender
										</label>
										<select
											id='gender'
											name='gender'
											className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
											onChange={handleInputChange}
										>
											<option value=''>Select gender</option>
											<option value='male'>Male</option>
											<option value='female'>Female</option>
											<option value='all'>All</option>
										</select>
									</div>
								</div>
							</div>
							<div>
								<label htmlFor='creatorNiche' className='block mb-1'>
									Preferred Creator Niche
								</label>
								<select
									id='creatorNiche'
									name='creatorNiche'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									onChange={handleInputChange}
									multiple
								>
									<option value='fashion'>Fashion</option>
									<option value='fitness'>Fitness</option>
									<option value='travel'>Travel</option>
									<option value='food'>Food</option>
									<option value='tech'>Tech</option>
								</select>
							</div>
							<div>
								<label htmlFor='creatorBenchmark' className='block mb-1'>
									Creator Performance Benchmark
								</label>
								<input
									type='text'
									id='creatorBenchmark'
									name='creatorBenchmark'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									placeholder='e.g., Minimum 10,000 Instagram followers'
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
				)}

				{currentStep === 3 && (
					<div>
						<h2 className='text-xl font-semibold mb-4'>Budget & Timeline</h2>
						<div className='space-y-4'>
							<div>
								<label htmlFor='campaignBudget' className='block mb-1'>
									Total Campaign Budget
								</label>
								<div className='relative'>
									<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>
										<FiDollarSign />
									</span>
									<input
										type='number'
										id='campaignBudget'
										name='campaignBudget'
										className='w-full pl-10 p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
										placeholder='Enter budget amount'
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div>
								<label htmlFor='paymentModel' className='block mb-1'>
									Payment Model
								</label>
								<select
									id='paymentModel'
									name='paymentModel'
									className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
									onChange={handleInputChange}
								>
									<option value=''>Select payment model</option>
									<option value='flatFee'>Flat Fee</option>
									<option value='performanceBased'>
										Performance-Based Bonus
									</option>
									<option value='revenueSharing'>Revenue Sharing Pool</option>
									<option value='milestoneBased'>
										Milestone-Based Payments
									</option>
								</select>
							</div>
							<div>
								<label htmlFor='campaignStart' className='block mb-1'>
									Campaign Start Date
								</label>
								<div className='relative'>
									<input
										type='date'
										id='campaignStart'
										name='campaignStart'
										className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
										onChange={handleInputChange}
									/>
									<FiCalendar className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
								</div>
							</div>
							<div>
								<label htmlFor='campaignEnd' className='block mb-1'>
									Campaign End Date
								</label>
								<div className='relative'>
									<input
										type='date'
										id='campaignEnd'
										name='campaignEnd'
										className='w-full p-2 border rounded dark:bg-darkMainBg dark:border-gray-600'
										onChange={handleInputChange}
									/>
									<FiCalendar className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
								</div>
							</div>
						</div>
					</div>
				)}

				{currentStep === 4 && (
					<div>
						<h2 className='text-xl font-semibold mb-4'>Legal & Compliance</h2>
						<div className='space-y-4'>
							<div>
								<label htmlFor='termsConditions' className='block mb-1'>
									Campaign Terms & Conditions
								</label>
								<div className='flex items-center space-x-2'>
									<input
										type='file'
										id='termsConditions'
										name='termsConditions'
										className='hidden'
										onChange={handleInputChange}
									/>
									<label
										htmlFor='termsConditions'
										className='cursor-pointer bg-primaryBrandColor text-white py-2 px-4 rounded flex items-center'
									>
										<FiUpload className='mr-2' />
										Upload T&C Document
									</label>
								</div>
							</div>
							<div>
								<label className='flex items-center space-x-2'>
									<input
										type='checkbox'
										name='nda'
										className='form-checkbox'
										onChange={handleInputChange}
									/>
									<span>Require Non-Disclosure Agreement (NDA)</span>
								</label>
							</div>
							<div>
								<label className='flex items-center space-x-2'>
									<input
										type='checkbox'
										name='agreeTerms'
										className='form-checkbox'
										onChange={handleInputChange}
									/>
									<span>I agree to the platform's terms and conditions</span>
								</label>
							</div>
						</div>
					</div>
				)}

				{/* Navigation Buttons */}
				<div className='mt-8 flex justify-between'>
					<button
						onClick={prevStep}
						disabled={currentStep === 0}
						className={`px-4 py-2 rounded ${
							currentStep === 0
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-primaryBrandColor text-white hover:bg-opacity-90'
						}`}
					>
						<FiChevronLeft className='inline mr-2' />
						Previous
					</button>
					<button
						onClick={
							currentStep === steps.length - 1
								? () => console.log(formData)
								: nextStep
						}
						className='px-4 py-2 bg-primaryBrandColor text-white rounded hover:bg-opacity-90'
					>
						{currentStep === steps.length - 1 ? 'Submit' : 'Next'}
						{currentStep !== steps.length - 1 && (
							<FiChevronRight className='inline ml-2' />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
