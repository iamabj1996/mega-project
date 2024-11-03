import { Logo, NavLinks } from '../components';
import { LuChevronRight } from 'react-icons/lu';
import { useDashboardContext } from '../pages/DashboardLayout';

export default function Sidebar() {
	const { toggleSidebar, showSidebar } = useDashboardContext();

	return (
		<div
			className={`hidden lg:flex flex-col h-screen bg-lightMainBg dark:bg-darkMainBg border-r ${
				showSidebar ? 'w-64' : 'w-28'
			} transition-all duration-300`}
		>
			<div
				className={`flex items-center p-5 ${
					showSidebar ? 'justify-between' : 'justify-center'
				}  border-b`}
			>
				{showSidebar && <Logo width='10rem' />}
				<button variant='ghost' size='icon' onClick={toggleSidebar}>
					<LuChevronRight
						className={`h-6 w-6 transition-transform duration-300 ${
							showSidebar ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</div>
			<div className='flex-1'>
				<NavLinks />
			</div>
		</div>
	);
}
