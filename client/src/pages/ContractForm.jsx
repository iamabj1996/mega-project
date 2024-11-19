import React, { useEffect, useState } from 'react';
import {
	Form,
	redirect,
	useActionData,
	useLoaderData,
	useParams,
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import image from '../assets/ab3.png';
import 'react-datepicker/dist/react-datepicker.css';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useDashboardContext } from './DashboardLayout';
import BrandSubscriptionModal from '../components/BrandSubscriptionModal';

export const loader = async ({ params }) => {
	if (params.id === '-1') return null;
	try {
		const { data } = await customFetch.get(`/contract/${params.id}`);
		return { data };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

export const action = async ({ params, request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	// Extract and group the deliverables into an array of objects
	const deliverables = [];
	const deliverableEntries = Object.entries(data).filter(([key]) =>
		key.startsWith('deliverables[')
	);

	// Organize deliverable data by index
	const deliverableMap = new Map();
	deliverableEntries.forEach(([key, value]) => {
		const match = key.match(/deliverables\[(\d+)\]\.(\w+)/);
		if (match) {
			const [, index, field] = match;
			if (!deliverableMap.has(index)) {
				deliverableMap.set(index, {});
			}
			deliverableMap.get(index)[field] =
				field === 'quantity' ? parseInt(value) : value;
		}
	});

	// Convert the map to an array
	deliverableMap.forEach((deliverable) => deliverables.push(deliverable));

	// Delete the previous deliverables[number] keys from data
	deliverableEntries.forEach(([key]) => delete data[key]);

	// Add the new deliverables array to the data
	const finalData = { ...data, deliverables };

	console.log('params.id', params.id === '-1');

	if (params?.id === '-1') {
		try {
			await customFetch.post(`/contract`, finalData);
			console.log('finalData', finalData);
			toast.success(
				'Contract created successfully and sent to creator as well'
			);
			return redirect('/dashboard/contract');
		} catch (error) {
			if (error?.response?.data?.msg.startsWith('Become a paid customer')) {
				return { showSubscriptionModal: true };
			}
			toast.error(error?.response?.data?.msg);
			return error;
		}
	} else {
		finalData?.brandName && delete finalData.brandName;
		finalData?.influencerName && delete finalData.influencerName;
		try {
			await customFetch.patch(`/contract/${params?.id}`, finalData);
			toast.success(
				'Contract Modified successfully and sent to creator as well'
			);
			return redirect(`/dashboard/contract/${params?.id}`);
		} catch (error) {
			toast.error(error?.response?.data?.msg);
			return error;
		}
	}
};

export default function ContractForm() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const actionData = useActionData();
	const { user, logoutUser } = useDashboardContext();
	console.log('loggingUser', user);
	const { id } = useParams();
	const contractData = useLoaderData();
	const { data } = contractData || {};
	const contract = data?.contract;

	const isReadOnly = id === '-1';

	const [startDate, setStartDate] = useState(
		!isReadOnly && contract?.startDate
	);
	const [endDate, setEndDate] = useState(!isReadOnly && contract?.endDate);
	const [nextMilestone, setNextMilestone] = useState(
		!isReadOnly && contract?.nextMilestone
	);
	const [deliverables, setDeliverables] = useState(
		!isReadOnly && contract?.deliverables?.length > 0
			? contract.deliverables
			: [{ platform: '', contentType: '', quantity: 1 }]
	);

	const handleDeliverableChange = (index, field, value) => {
		const newDeliverables = [...deliverables];
		newDeliverables[index][field] = value;
		setDeliverables(newDeliverables);
	};

	const addDeliverable = () => {
		setDeliverables([
			...deliverables,
			{ platform: '', contentType: '', quantity: 1 },
		]);
	};

	const removeDeliverable = (index) => {
		const newDeliverables = deliverables.filter((_, i) => i !== index);
		setDeliverables(newDeliverables);
	};

	const handleSubscribe = async () => {
		try {
			const { data } = await customFetch.get(`/payment/subscribe`);
			console.log('data', data);
			console.log('subscriptionId', data.subscriptionId);

			if (data.subscriptionId !== undefined || data.subscriptionId !== '') {
				const subscriptionId = String(data.subscriptionId); // Ensure it's a string

				const openPopup = () => {
					const options = {
						key: 'rzp_test_rjGkHnDnqCUBkd',
						subscription_id: subscriptionId,
						name: 'Abronic Link',
						description: 'Brand Premium Subscription',
						image: image,
						prefill: {
							name: user.name, // Your customer's name
							email: user.email,
							contact: '', // Provide the customer's phone number for better conversion rates
						},
						handler: async function (response) {
							alert(JSON.stringify(response));
							await customFetch.get(
								`payment/subscription-verification/${response.razorpay_payment_id}/${response.razorpay_subscription_id}/${response.razorpay_signature}`
							);
						},
						theme: {
							color: '#00853D',
						},
					};

					const razor = new window.Razorpay(options);
					razor.open();
					// razor.on('payment.success', function (resp) {
					// 	toast.success('Payment Successful, please login again');
					// 	logoutUser();
					// });
				};

				openPopup();
			}
		} catch (error) {
			toast.error(error?.response?.data?.msg || 'An error occurred');
		}

		console.log('User subscribed');
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (actionData?.showSubscriptionModal) {
			setIsModalOpen(true);
		}
	}, [actionData]);

	return (
		<div className='min-h-screen bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1'>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8 text-primaryBrandColor'>
					{isReadOnly ? 'Create New Contract' : 'Edit Contract'}{' '}
				</h1>
				<Form
					method='post'
					className='bg-lightCardBg dark:bg-darkCardBg shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4'
				>
					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='influencerName'
						>
							Brand Name
						</label>
						<input
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							type='text'
							placeholder='Enter influencer name'
							name='brandName'
							required
							defaultValue={!isReadOnly ? contract?.brand?.name : ''}
							readOnly={!isReadOnly}
						/>
					</div>
					<input
						type='text'
						defaultValue={!isReadOnly && contract?.brand?.id}
						hidden={true}
						name='brand'
					/>
					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='influencerName'
						>
							Influencer Name
						</label>
						<input
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							type='text'
							placeholder='Enter influencer name'
							name='influencerName'
							required
							defaultValue={!isReadOnly ? contract?.influencer?.name : ''}
							readOnly={!isReadOnly}
						/>
					</div>

					<input
						type='text'
						defaultValue={!isReadOnly && contract?.influencer?.id}
						hidden={true}
						name='influencer'
					/>

					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='campaignName'
						>
							Campaign Name
						</label>
						<input
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							type='text'
							placeholder='Enter campaign name'
							name='campaign'
							defaultValue={!isReadOnly ? contract?.campaign : ''}
							required
							readOnly={!isReadOnly}
						/>
					</div>
					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='status'
						>
							Status
						</label>
						<select
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							name='status'
							defaultValue={isReadOnly ? 'Proposal' : contract?.status}
							disabled={isReadOnly}
							required
						>
							<option value=''>Select status</option>
							<option value='Proposal'>Proposal</option>
							<option value='Ongoing'>Ongoing</option>
							<option value='Past'>Past</option>
						</select>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
							<label
								className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
								htmlFor='startDate'
							>
								Start Date
							</label>
							<DatePicker
								name='startDate'
								className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
								placeholderText='Select start date'
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								readOnly={user.role !== 'brand'}
							/>
						</div>
						<div className='w-full md:w-1/2 px-3'>
							<label
								className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
								htmlFor='endDate'
							>
								End Date
							</label>
							<DatePicker
								name='endDate'
								className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
								placeholderText='Select end date'
								selected={endDate}
								onChange={(date) => setEndDate(date)}
								readOnly={user.role !== 'brand'}
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
							<label
								className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
								htmlFor='amount'
							>
								Amount
							</label>
							<input
								className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
								type='number'
								placeholder='Enter amount'
								name='amount'
								required
								defaultValue={!isReadOnly && contract?.amount}
							/>
						</div>
						<div className='w-full md:w-1/2 px-3'>
							<label
								className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
								htmlFor='currency'
							>
								Currency
							</label>
							<select
								className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
								name='currency'
								required
								defaultValue={!isReadOnly && contract?.currency}
							>
								<option value=''>Select currency</option>
								<option value='INR'>INR</option>
								<option value='USD'>USD</option>
								<option value='EUR'>EUR</option>
								<option value='GBP'>GBP</option>
								<option value='JPY'>JPY</option>
							</select>
						</div>
					</div>
					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='stage'
						>
							Stage
						</label>
						<select
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							name='stage'
							defaultValue={isReadOnly ? 'Proposal Sent' : contract?.stage}
							disabled={isReadOnly}
							required
						>
							<option value=''>Select stage</option>
							<option value='Proposal Sent'>Proposal Sent</option>
							<option value='Negotiating'>Negotiating</option>
							<option value='Finalized'>Finalized</option>
							<option value='Content Creation'>Content Creation</option>
							<option value='Completed'>Completed</option>
							<option value='Terminated'>Terminated</option>
						</select>
					</div>
					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='nextMilestone'
						>
							Next Milestone
						</label>
						<DatePicker
							name='nextMilestone'
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							placeholderText='Select next milestone'
							selected={nextMilestone}
							onChange={(date) => setNextMilestone(date)}
							readOnly={user.role !== 'brand'}
						/>
					</div>
					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='deliverables'
						>
							Deliverables
						</label>
						{deliverables.map((deliverable, index) => (
							<div
								key={index}
								className='mb-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg'
							>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full md:w-1/3 px-3 mb-2 md:mb-0'>
										<select
											className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
											value={deliverable.platform}
											name={`deliverables[${index}].platform`} // <-- Updated name
											onChange={(e) =>
												handleDeliverableChange(
													index,
													'platform',
													e.target.value
												)
											}
											required
											disabled={user?.role !== 'brand'}
										>
											<option value=''>Select platform</option>
											<option value='Instagram'>Instagram</option>
											<option value='Youtube'>YouTube</option>
										</select>
									</div>
									<div className='w-full md:w-1/3 px-3 mb-2 md:mb-0'>
										<select
											className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
											value={deliverable.contentType}
											name={`deliverables[${index}].contentType`} // <-- Updated name
											onChange={(e) =>
												handleDeliverableChange(
													index,
													'contentType',
													e.target.value
												)
											}
											required
											disabled={!deliverable.platform || user?.role !== 'brand'}
										>
											<option value=''>Select content type</option>
											<option value='Video'>Video</option>
											<option value='Post'>Post</option>
											<option value='Story'>Story</option>
										</select>
									</div>
									<div className='w-full md:w-1/3 px-3'>
										<input
											type='number'
											className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
											value={deliverable.quantity}
											name={`deliverables[${index}].quantity`} // <-- Updated name
											onChange={(e) =>
												handleDeliverableChange(
													index,
													'quantity',
													parseInt(e.target.value)
												)
											}
											min='1'
											required
											disabled={
												!deliverable.contentType || user?.role !== 'brand'
											}
										/>
									</div>
								</div>
								{index > 0 && (
									<button
										type='button'
										onClick={() => removeDeliverable(index)}
										className='mt-2 text-red-500 hover:text-red-700'
										disabled={user?.role !== 'brand'}
									>
										Remove
									</button>
								)}
							</div>
						))}

						<button type='button' onClick={addDeliverable} className='main-btn'>
							Add Deliverable
						</button>
					</div>
					<div className='mb-6'>
						<label
							className='block text-lightTextIcons1 dark:text-darkTextIcons1 text-sm font-bold mb-2'
							htmlFor='paymentStatus'
						>
							Payment Status
						</label>
						<select
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							name='paymentStatus'
							defaultValue={isReadOnly ? 'Pending' : contract?.paymentStatus}
							disabled={isReadOnly || user?.role !== 'brand'}
							required
						>
							<option value=''>Select payment status</option>
							<option value='Pending'>Pending</option>
							<option value='Partial'>Partial</option>
							<option value='Paid'>Paid</option>
						</select>
					</div>
					<div className='flex items-center justify-between'>
						<button className='main-btn' type='submit'>
							{isReadOnly ? 'Create Contract' : 'Edit Contract'}
						</button>
					</div>
				</Form>
			</div>
			{isModalOpen && (
				<BrandSubscriptionModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubscribe={handleSubscribe}
				/>
			)}
		</div>
	);
}
