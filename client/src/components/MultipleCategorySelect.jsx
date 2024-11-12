import { useState, useMemo, useRef, useEffect } from 'react';

const MultipleCategorySelect = ({
	name,
	labelText,
	options, // Array of category options in { value, label } format
	selectedOptions, // Array of initially selected categories
	onChange, // Function to update selected categories in the parent component
	mandatory, // To indicate if the field is mandatory
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategories, setSelectedCategories] = useState(
		selectedOptions || []
	);
	const dropdownRef = useRef(null);

	// Filter categories based on search query
	const filteredCategories = useMemo(
		() =>
			options.filter((option) =>
				option.label.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[options, searchQuery]
	);

	// Toggle selection of categories with a limit of 4
	const handleSelect = (category) => {
		if (selectedCategories.includes(category)) {
			// Deselect if already selected
			const updatedCategories = selectedCategories.filter(
				(cat) => cat !== category
			);
			setSelectedCategories(updatedCategories);
			onChange(updatedCategories.map((cat) => cat.value));
		} else if (selectedCategories.length < 4) {
			// Select if under limit
			const updatedCategories = [...selectedCategories, category];
			setSelectedCategories(updatedCategories);
			onChange(updatedCategories.map((cat) => cat.value));
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			<label
				htmlFor={name}
				className='block mb-2 text-sm font-medium text-lightTextIcons1 dark:text-darkTextIcons1'
			>
				{labelText}
				{mandatory && <span className='text-red-500'> *</span>}
			</label>

			{/* Input Field to Open Dropdown */}
			<input
				type='text'
				id={name}
				name={name}
				readOnly
				value={selectedCategories.map((cat) => cat.label).join(', ') || ''}
				placeholder='Select up to 4 categories'
				className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
				onClick={() => setIsOpen(!isOpen)}
				required={mandatory}
			/>

			{/* Dropdown List */}
			{isOpen && (
				<div className='absolute z-10 mt-1 w-full bg-white dark:bg-darkMainBg shadow rounded-lg max-h-60 overflow-y-auto'>
					<input
						type='text'
						placeholder='Search categories...'
						className='w-full px-4 py-2 border-b bg-gray-100 dark:bg-darkMainBg dark:text-white focus:outline-none'
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<ul className='divide-y divide-gray-200 dark:divide-gray-600'>
						{filteredCategories.map((category) => (
							<li
								key={category.value}
								className={`p-2 cursor-pointer ${
									selectedCategories.includes(category)
										? 'bg-primaryBrandColor text-white'
										: ''
								} ${
									selectedCategories.length >= 4 &&
									!selectedCategories.includes(category)
										? 'opacity-50 cursor-not-allowed'
										: ''
								}`}
								onClick={() =>
									selectedCategories.length < 4 ||
									selectedCategories.includes(category)
										? handleSelect(category)
										: null
								}
							>
								{category.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MultipleCategorySelect;
