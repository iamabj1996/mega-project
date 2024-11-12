import { useState, useMemo, useRef, useEffect } from 'react';
import { countries, getCountryCode } from 'countries-list';

const CountrySelect = ({
	name,
	labelText,
	defaultValue = 'India',
	onChange,
	mandatory, // To indicate if the field is mandatory
	disabled,
}) => {
	const countryList = useMemo(
		() =>
			Object.values(countries).map((country) => ({
				name: country.name,
				code: getCountryCode(country.name),
			})),
		[]
	);

	const [searchQuery, setSearchQuery] = useState(defaultValue || ''); // Set initial value from defaultValue
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Filter countries based on search query
	const filteredCountries = useMemo(
		() =>
			countryList.filter((country) =>
				country.name.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[countryList, searchQuery]
	);

	// Handle country selection
	const handleSelect = (country) => {
		setSearchQuery(country.name); // Set search query to the selected country
		onChange(country.name); // Pass selected country value to parent
		setIsOpen(false); // Close the dropdown
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

	// Handle input changes (for clearing the value or manual input)
	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value); // Update search query based on  input

		// If the input is cleared, pass an empty value to onChange
		if (value === '') {
			onChange(''); // Clear the selected country
		}
	};

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
				value={searchQuery} // Use the search query to control the input
				placeholder='Search and select a country'
				className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
				onClick={() => setIsOpen(true)} // Open dropdown on click
				onChange={handleInputChange} // Handle manual input change
				required={mandatory}
				autoComplete='off'
				disabled={disabled || false}
			/>

			{/* Dropdown List */}
			{isOpen && (
				<div className='absolute z-10 mt-1 w-full bg-white dark:bg-darkMainBg shadow rounded-lg max-h-60 overflow-y-auto'>
					<ul className='divide-y divide-gray-200 dark:divide-gray-600'>
						{filteredCountries.map((country) => (
							<li
								key={country.code}
								className='p-2 cursor-pointer hover:bg-primaryBrandColor hover:text-white'
								onClick={() => handleSelect(country)} // Select country on click
							>
								{country.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default CountrySelect;
