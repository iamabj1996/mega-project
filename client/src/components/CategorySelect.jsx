import { useState, useMemo, useRef, useEffect } from 'react';

const CategorySelect = ({
	name,
	labelText,
	options,
	selectedOption,
	onChange,
	mandatory,
}) => {
	const [searchQuery, setSearchQuery] = useState(''); // Track the user input
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	const dropdownRef = useRef(null);

	// Filter categories based on search query
	const filteredCategories = useMemo(
		() =>
			options.filter((option) =>
				option.label.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[options, searchQuery]
	);

	// Handle category selection
	const handleSelect = (category) => {
		setSelectedCategory(category); // Set the selected category
		setSearchQuery(category.label); // Set the search query to the selected category's label
		onChange(category.value); // Pass selected category value to parent
		setIsOpen(false); // Close the dropdown after selection
	};

	// Handle backspace or clearing the input field
	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value); // Update the search query with user input

		// If the input is empty, clear the selected category
		if (value === '') {
			setSelectedCategory(''); // Reset selected category
			onChange(''); // Notify parent to clear the selected category
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
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Display the selected category's label in the input field
	const inputValue = selectedCategory ? selectedCategory.value : searchQuery;

	return (
		<div className='relative' ref={dropdownRef}>
			<label
				htmlFor={name}
				className='block mb-2 text-sm font-medium text-lightTextIcons1 dark:text-darkTextIcons1'
			>
				{labelText}
				{mandatory && <span className='text-red-500'> *</span>}
			</label>

			{/* Input Field with Search Functionality */}
			<input
				type='text'
				id={name}
				name={name}
				value={inputValue} // Use the search query or selected category label as input value
				placeholder='Search and select category'
				className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
				onClick={() => setIsOpen(true)} // Open dropdown on click
				onChange={handleInputChange} // Handle input change
				required={mandatory}
				autoComplete='off'
			/>

			{/* Dropdown List */}
			{isOpen && (
				<div className='absolute z-10 mt-1 w-full bg-white dark:bg-darkMainBg shadow rounded-lg max-h-60 overflow-y-auto'>
					<ul className='divide-y divide-gray-200 dark:divide-gray-600'>
						{/* Render filtered categories or show a no results message */}
						{filteredCategories.length > 0 ? (
							filteredCategories.map((category) => (
								<li
									key={category.value}
									className={`p-2 cursor-pointer ${
										selectedCategory &&
										selectedCategory.value === category.value
											? 'bg-primaryBrandColor text-white'
											: ''
									}`}
									onClick={() => handleSelect(category)} // Select category on click
								>
									{category.label}
								</li>
							))
						) : (
							<li className='p-2 text-gray-500'>No categories found</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default CategorySelect;
