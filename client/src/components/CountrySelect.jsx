import { useState, useMemo } from 'react';
import { countries, getCountryCode } from 'countries-list';

const CountrySelect = ({
	name,
	labelText,
	defaultValue,
	onChange,
	mandatory, // To indicate if the field is mandatory
}) => {
	const countryList = useMemo(
		() =>
			Object.values(countries).map((country) => ({
				name: country.name,
				code: getCountryCode(country.name),
			})),
		[]
	);

	const [searchQuery, setSearchQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const filteredCountries = countryList.filter((country) =>
		country.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSelect = (country) => {
		setIsOpen(false);
		onChange(country.name); // Update the value in the parent form
	};

	return (
		<div className='relative'>
			<label
				htmlFor={name}
				className='block mb-2 text-sm font-medium text-lightTextIcons1 dark:text-darkTextIcons1'
			>
				{labelText || name}
				{mandatory && <span className='text-red-500'> *</span>}{' '}
				{/* Visual indication of mandatory */}
			</label>

			{/* Input Field to Open Dropdown */}
			<input
				type='text'
				id={name}
				name={name}
				readOnly
				value={defaultValue || ''}
				placeholder='Select a country'
				className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
				onClick={() => setIsOpen(!isOpen)}
				required // Make the input mandatory
			/>

			{/* Dropdown List */}
			{isOpen && (
				<div className='absolute z-10 mt-1 w-full bg-white dark:bg-darkMainBg shadow rounded-lg max-h-60 overflow-y-auto'>
					<input
						type='text'
						placeholder='Search country...'
						className='w-full px-4 py-2 border-b bg-gray-100 dark:bg-darkMainBg dark:text-white focus:outline-none'
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<ul className='divide-y divide-gray-200 dark:divide-gray-600'>
						{filteredCountries.map((country) => (
							<li
								key={country.code}
								className='p-2 cursor-pointer'
								onClick={() => handleSelect(country)}
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
