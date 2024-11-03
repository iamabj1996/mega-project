const FormRow = ({ type, name, labelText, defaultValue }) => {
	return (
		<div>
			<label
				htmlFor={name}
				className='block mb-2 text-sm font-medium text-lightTextIcons1 dark:text-darkTextIcons1 capitalize '
			>
				{labelText || name}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				defaultValue={defaultValue || ''}
				required
				className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
			/>
		</div>
	);
};
export default FormRow;
