import React, { useState, useEffect } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import { FaSearch, FaYoutube, FaInstagram, FaFilter } from 'react-icons/fa';
import { useAllCreatorsContext } from '../pages/AllCreatorsLayout';
import InstagramCreatorCard from './InstagramCreatorCard';
import YoutubeChannelCard from './YoutubeChannelCard';
import CountrySelect from './CountrySelect';
import CategorySelect from './CategorySelect';
import { categories } from '../utils/categories';
import PageBtnContainer from './PageBtnContainer';

const AllCreatorsContainer = () => {
	const submit = useSubmit();
	const { data, instagramPages } = useAllCreatorsContext();
	const { instagramCreators, totalInstagramCreators, numOfPages } =
		instagramPages;
	const { youtubeChannels } = data;

	const [showYoutube, setShowYoutube] = useState(true);
	const [showFilters, setShowFilters] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCategories, setSelectedCategories] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

	// Debounce logic
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 2000); // 2000ms delay

		return () => {
			clearTimeout(timeoutId); // Cleanup the timeout on component unmount or before running the next effect
		};
	}, [searchTerm]);

	useEffect(() => {
		// Update the params when debouncedSearchTerm changes
		submit({
			location: selectedCountry,
			categories: selectedCategories,
			search: debouncedSearchTerm, // If searchTerm is empty, it will still trigger the update with an empty string
		});
	}, [debouncedSearchTerm, selectedCountry, selectedCategories, submit]);

	// Function to render the content (creators list)
	const renderContent = () => {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{(showYoutube ? youtubeChannels : instagramCreators)?.map(
					(creator, index) =>
						showYoutube ? (
							<YoutubeChannelCard key={index} {...creator} />
						) : (
							<InstagramCreatorCard key={index} {...creator} />
						)
				)}
			</div>
		);
	};

	// Handle form changes for country, category, and search term
	const handleCountryChange = (value) => {
		setSelectedCountry(value);
		submit({
			location: value,
			categories: selectedCategories,
			search: debouncedSearchTerm, // Ensure this still works even if the search is empty
		});
	};

	const handleCategoryChange = (selected) => {
		setSelectedCategories(selected); // Update the state with the new categories
		submit({
			location: selectedCountry,
			categories: selected, // Use the `selected` categories directly instead of `selectedCategories`
			search: debouncedSearchTerm, // Update search term even if it's empty
		});
	};

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value); // Update search term and trigger debounce
	};

	return (
		<Form className='space-y-6'>
			<div className='flex flex-col items-center justify-between gap-4'>
				<div className='w-full max-w-3xl space-y-4'>
					<div className='relative w-full'>
						<input
							type='text'
							placeholder='Search creators...'
							className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1 focus:outline-none focus:ring-2 focus:ring-primaryBrandColor'
							name='search'
							value={searchTerm}
							onChange={handleSearchChange} // Handle search term changes
						/>
						<FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
					</div>
					<div className='flex flex-wrap gap-2 items-center'>
						<div className='flex-grow'>
							<CountrySelect
								name='location'
								defaultValue={selectedCountry}
								onChange={handleCountryChange} // Handle country change
								mandatory={false}
							/>
						</div>
						<div className='flex-grow'>
							<CategorySelect
								name='categories'
								options={categories}
								selectedOptions={selectedCategories}
								onChange={handleCategoryChange} // Handle category selection
								mandatory={false}
							/>
						</div>
						<button
							onClick={() => setShowFilters(!showFilters)}
							className='p-2 text-primaryBrandColor border border-primaryBrandColor rounded-lg hover:bg-primaryBrandColor hover:text-white transition-colors'
						>
							<FaFilter className='mr-2 inline' />
							Filters
						</button>
					</div>
				</div>
				<div className='flex items-center bg-lightCardBg dark:bg-darkCardBg rounded-lg p-1'>
					<button
						onClick={() => setShowYoutube(true)}
						className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
							showYoutube
								? 'bg-primaryBrandColor text-white'
								: 'text-lightTextIcons1 dark:text-darkTextIcons1 hover:bg-gray-200 dark:hover:bg-gray-700'
						}`}
					>
						<FaYoutube className='mr-2' />
						YouTube
					</button>
					<button
						onClick={() => setShowYoutube(false)}
						className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
							!showYoutube
								? 'bg-primaryBrandColor text-white'
								: 'text-lightTextIcons1 dark:text-darkTextIcons1 hover:bg-gray-200 dark:hover:bg-gray-700'
						}`}
					>
						<FaInstagram className='mr-2' />
						Instagram
					</button>
				</div>
			</div>

			{/* Render filter options statically when `showFilters` is true */}
			{showFilters && (
				<div className='bg-lightCardBg dark:bg-darkCardBg rounded-lg p-4 mb-6'>
					<h3 className='text-lg font-semibold mb-4'>
						Additional Filters (Static)
					</h3>
					<p className='text-sm text-gray-500'>
						Filter options displayed here are currently non-functional.
					</p>
				</div>
			)}

			{/* Render Instagram creators count when `showYoutube` is false */}
			{!showYoutube && (
				<div className='bg-lightCardBg dark:bg-darkCardBg rounded-lg p-4 mb-6'>
					<p className='text-sm text-gray-500'>
						Total Instagram Creators: {totalInstagramCreators}
					</p>
				</div>
			)}

			{renderContent()}
			{numOfPages > 0 && <PageBtnContainer />}
		</Form>
	);
};

export default AllCreatorsContainer;
