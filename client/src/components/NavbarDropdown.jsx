'use client';

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronDown } from 'react-icons/lu';
import { useDashboardContext } from '../pages/DashboardLayout';

export default function NavbarDropdown() {
	const { user, logoutUser } = useDashboardContext();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center justify-center px-4 py-2 text-sm font-medium main-btn'
			>
				{user?.name}
				<LuChevronDown className='w-4 h-4 ml-2' />
			</button>

			{isOpen && (
				<div className='absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
					<div
						className='py-1'
						role='menu'
						aria-orientation='vertical'
						aria-labelledby='options-menu'
					>
						<button
							className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
							role='menuitem'
							onClick={logoutUser}
						>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
