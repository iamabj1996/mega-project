import React, { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
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

	console.log('Transformed Data:', finalData);

	try {
		await customFetch.post(`/contract`, finalData);
		toast.success('Contract created successfully and sent to creator as well');
		return redirect('/dashboard/contract');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

export default function ContractForm() {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [nextMilestone, setNextMilestone] = useState(null);
	const [deliverables, setDeliverables] = useState([
		{ platform: '', contentType: '', quantity: 1 },
	]);

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

	return (
		<div className='min-h-screen bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1'>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8 text-primaryBrandColor'>
					Create New Contract
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
							Influencer Name
						</label>
						<input
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
							type='text'
							placeholder='Enter influencer name'
							name='influencer'
							required
						/>
					</div>
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
							required
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
											disabled={!deliverable.platform}
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
											disabled={!deliverable.contentType}
										/>
									</div>
								</div>
								{index > 0 && (
									<button
										type='button'
										onClick={() => removeDeliverable(index)}
										className='mt-2 text-red-500 hover:text-red-700'
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
							Create Contract
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
