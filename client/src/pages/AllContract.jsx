import React, { useState } from 'react';
import {
	FiFilter,
	FiDownload,
	FiDollarSign,
	FiUsers,
	FiCalendar,
	FiPlus,
} from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { useContractContext } from './ContractLayout';
import { Link } from 'react-router-dom';
import { useDashboardContext } from './DashboardLayout';

export default function AllContract() {
	const { data } = useContractContext();
	const { user } = useDashboardContext();
	const { contracts } = data;
	const [activeTab, setActiveTab] = useState('ongoing');
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');

	// Calculate the total amount from contracts
	const totalAmount = contracts?.reduce(
		(sum, contract) => sum + contract.amount,
		0
	);

	const onGoingOrProposalCount = contracts.filter(
		(contract) =>
			contract.status === 'Ongoing' || contract.status === 'Proposal'
	).length;

	const filteredContracts = contracts
		.filter(
			(contract) =>
				contract.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				contract.influencer.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				contract._id.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter(
			(contract) =>
				filterStatus === 'all' ||
				contract.status.toLowerCase() === filterStatus.toLowerCase()
		);

	return (
		<div className='min-h-screen bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
					<h1 className='text-3xl font-bold'>Contract Management</h1>
					{user?.role === 'brand' && (
						<div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
							<Link
								to={'/dashboard/contract/-1'}
								className='px-4 py-2 bg-primaryBrandColor text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center'
							>
								<FiPlus className='w-4 h-4 mr-2' />
								Create New Influencer Contract
							</Link>
							<Link
								to={'/dashboard/contract/new-campaign'}
								className='px-4 py-2 bg-primaryBrandColor text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center'
							>
								<IoMdAddCircle className='w-4 h-4 mr-2' />
								Create New Campaign for UGC
							</Link>
						</div>
					)}
				</div>

				{/* Search and Filter Bar */}
				<div className='flex flex-col md:flex-row gap-4 mb-8'>
					<div className='flex-1 relative'>
						<input
							type='text'
							placeholder='Search by Influencer, Brand, or Contract ID'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
						/>
					</div>
					<select
						value={filterStatus}
						onChange={(e) => setFilterStatus(e.target.value)}
						className='md:w-48 shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
					>
						<option value='all'>All Statuses</option>
						<option value='ongoing'>Ongoing</option>
						<option value='completed'>Completed</option>
						<option value='negotiating'>Negotiating</option>
					</select>
					<button className='w-full md:w-auto px-4 py-2 bg-primaryBrandColor text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center'>
						<FiFilter className='w-4 h-4 mr-2' />
						More Filters
					</button>
				</div>

				{/* Summary Dashboard */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
					<DashboardCard
						icon={FaHandshake}
						title='Total Contracts'
						value={contracts && contracts.length}
						change='Total active & past contracts'
					/>
					<DashboardCard
						icon={FiDollarSign}
						title={user.role === 'brand' ? 'Expenditure' : 'Revenue'}
						value={totalAmount}
						change='Total Amount settled and to be settled'
					/>
					<DashboardCard
						icon={FiUsers}
						title={
							user.role === 'brand' ? 'Active Creators' : 'Ongoing Contract'
						}
						value={onGoingOrProposalCount}
						change='Contracts that are with status of proposal & ongoing'
					/>
					{/* <DashboardCard
						icon={FiCalendar}
						title='Upcoming Deadlines'
						value='12'
						change='3 due this week'
					/> */}
				</div>

				{/* Contract Tabs and Tables */}
				<div className='mb-8'>
					<div className='flex border-b'>
						<TabButton
							active={activeTab === 'ongoing'}
							onClick={() => setActiveTab('ongoing')}
						>
							Ongoing
						</TabButton>
						<TabButton
							active={activeTab === 'past'}
							onClick={() => setActiveTab('past')}
						>
							Past
						</TabButton>
						<TabButton
							active={activeTab === 'proposal'}
							onClick={() => setActiveTab('proposal')}
						>
							Proposal
						</TabButton>
					</div>
				</div>

				<ContractTable contracts={filteredContracts} type={activeTab} />
			</div>
		</div>
	);
}

function DashboardCard({ icon: Icon, title, value, change }) {
	return (
		<div className='bg-white dark:bg-darkCardBg p-6 rounded-lg shadow-md'>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
					{title}
				</h3>
				<Icon className='h-5 w-5 text-gray-400' />
			</div>
			<div className='text-2xl font-bold'>{value}</div>
			<p className='text-xs text-gray-500 dark:text-gray-400'>{change}</p>
		</div>
	);
}

function TabButton({ children, active, onClick }) {
	return (
		<button
			className={`px-4 py-2 font-medium ${
				active
					? 'border-b-2 border-primaryBrandColor text-primaryBrandColor'
					: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

function ContractTable({ contracts, type }) {
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full bg-white dark:bg-darkCardBg'>
				<thead>
					<tr className='bg-gray-100 dark:bg-gray-700'>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
							Contract ID
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
							Brand
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
							Influencer
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
							Campaign
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
							Status
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
							Amount
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200 dark:divide-gray-600'>
					{contracts.map((contract) => (
						<tr key={contract._id}>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<Link to={`/dashboard/contract/${contract._id}`}>
									{contract._id}
								</Link>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm'>
								{contract?.brand?.name}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm'>
								{contract?.influencer?.name}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm'>
								{contract?.campaign}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm'>
								{contract?.status}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm'>
								{contract?.currency} {contract?.amount.toLocaleString()}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm'>
								<div className='flex space-x-2'>
									<Link
										to={`/dashboard/contract/${contract._id}`}
										className='px-3 py-1 bg-primaryBrandColor text-white rounded hover:bg-opacity-90 transition-colors duration-200'
									>
										View
									</Link>
									<button className='px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'>
										<FiDownload className='w-4 h-4' />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
