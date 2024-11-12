import { useDashboardContext } from '../pages/DashboardLayout';
import influencerLinks from '../utils/influencerLinks';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
	const { showSidebar, user } = useDashboardContext();

	return (
		<nav className='flex flex-col gap-4 p-4'>
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
					(item.href === 'search-creators' || item.href === 'brand-profile')
				) {
					return;
				}

				return (
					<NavLink
						end
						key={index}
						to={item.href}
						className={({ isActive }) =>
							`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
								isActive
									? 'bg-primaryBrandColor text-darkTextIcons1'
									: 'hover:text-primaryBrandColor'
							} ${showSidebar ? '' : 'justify-center'}`
						}
					>
						{item.icon}
						{showSidebar && <span>{item.label}</span>}
					</NavLink>
				);
			})}
		</nav>
	);
};
export default NavLinks;
