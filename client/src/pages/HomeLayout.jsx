import { Outlet } from 'react-router-dom';

// can add navbar above the outlet
const HomeLayout = () => {
	return (
		<>
			<Outlet />
		</>
	);
};
export default HomeLayout;
