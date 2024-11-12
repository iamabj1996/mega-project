import { Link, NavLink } from 'react-router-dom';
import { LuMoon, LuSun, LuMenu, LuX } from 'react-icons/lu';
import { NavbarDropdown } from './index.js';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import influencerLinks from '../utils/influencerLinks.jsx';

export default function Navbar() {
	const { toggleSidebar, showSidebar, isDarkMode, toggleDarkMode, user } =
		useDashboardContext();

	return (
		<>
			<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<div className='container flex h-16 items-center justify-between px-4'>
					<button
						className='lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none'
						onClick={toggleSidebar}
					>
						<LuMenu className='h-6 w-6 text-lightTextIcons1 dark:text-darkTextIcons1' />
					</button>

					<Link to='/' className='flex items-center space-x-2'>
						<span className='text-lg font-bold'>Dashboard</span>
					</Link>

					<div className='flex gap-x-5 items-center'>
						<button onClick={toggleDarkMode}>
							{isDarkMode ? (
								<LuSun className='h-6 w-6 text-lightTextIcons1 dark:text-darkTextIcons1' />
							) : (
								<LuMoon className='h-6 w-6 text-lightTextIcons1 dark:text-darkTextIcons1' />
							)}
							<span className='sr-only'>Toggle theme</span>
						</button>

						<NavbarDropdown />
					</div>
				</div>
			</header>

			{/* Modal for smaller screens */}
			{showSidebar && (
				<div className='fixed inset-0 z-50 lg:hidden'>
					<div
						className='absolute inset-0 bg-black bg-opacity-50'
						onClick={toggleSidebar}
					></div>
					<div className='absolute inset-y-0 left-0 w-64 bg-lightMainBg dark:bg-darkMainBg shadow-lg'>
						<div className='flex justify-between items-center p-4 border-b'>
							<Logo width='8rem' />
							<button
								className='focus:outline-none text-lightTextIcons1 dark:text-darkTextIcons1'
								onClick={toggleSidebar}
							>
								<LuX className='h-6 w-6' />
							</button>
						</div>

						{/* Dont forget to add NavLink Component replacing below component */}
						<nav className='p-4'>
							{influencerLinks.map((item, index) => {
								const { role } = user;
								if (
									role !== 'brand' &&
									role !== 'influencer' &&
									(item.href === 'messages' ||
										item.href === 'contract' ||
										item.href === '.' ||
										item.href === 'brand-profile')
								) {
									return;
								}

								if (role === 'brand' && item.href === '.') {
									return;
								}

								if (
									role === 'influencer' &&
									(item.href === 'search-creators' ||
										item.href === 'brand-profile')
								) {
									return;
								}
								return (
									<NavLink
										end
										key={index}
										to={item.href}
										className={({ isActive }) =>
											`flex items-center gap-4 px-3 py-2 rounded-md transition-colors ${
												isActive
													? 'bg-primaryBrandColor text-darkTextIcons1'
													: 'hover:text-primaryBrandColor'
											}`
										}
										onClick={toggleSidebar}
									>
										{item.icon}
										<span>{item.label}</span>
									</NavLink>
								);
							})}
						</nav>
					</div>
				</div>
			)}
		</>
	);
}
