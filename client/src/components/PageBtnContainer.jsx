import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllCreatorsContext } from '../pages/AllCreatorsLayout';

const PageBtnContainer = () => {
	const { instagramPages } = useAllCreatorsContext();
	const { numOfPages, currentPage } = instagramPages;

	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

	const { search, pathname } = useLocation();
	const navigate = useNavigate();

	const handlePageChange = (pageNumber) => {
		const searchParams = new URLSearchParams(search);
		searchParams.set('page', pageNumber);
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	const CustomButton = ({ children, onClick, disabled, active, ariaLabel }) => (
		<button
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			className={`
        px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${
					active
						? 'bg-primaryBrandColor text-white'
						: 'bg-lightCardBg dark:bg-darkCardBg text-lightTextIcons1 dark:text-darkTextIcons1'
				}
        ${
					disabled
						? 'opacity-50 cursor-not-allowed'
						: 'hover:bg-primaryBrandColor hover:text-white'
				}
        focus:outline-none focus:ring-2 focus:ring-primaryBrandColor focus:ring-opacity-50
      `}
		>
			{children}
		</button>
	);

	return (
		<div className='flex items-center justify-center space-x-2 mt-8'>
			<CustomButton
				onClick={() => {
					let prevPage = currentPage - 1;
					if (prevPage < 1) prevPage = numOfPages;
					handlePageChange(prevPage);
				}}
				disabled={currentPage === 1}
				ariaLabel='Previous page'
			>
				<FaChevronLeft className='h-4 w-4' />
			</CustomButton>

			{pages.map((pageNumber) => (
				<CustomButton
					key={pageNumber}
					onClick={() => {
						let nextPage = currentPage + 1;
						if (nextPage > 1) nextPage = 1;
						handlePageChange(nextPage);
					}}
					active={currentPage === pageNumber}
					ariaLabel={`Go to page ${pageNumber}`}
				>
					{pageNumber}
				</CustomButton>
			))}

			<CustomButton
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage}
				ariaLabel='Next page'
			>
				<FaChevronRight className='h-4 w-4' />
			</CustomButton>
		</div>
	);
};

export default PageBtnContainer;
