import { Link } from 'react-router-dom';
import { Logo } from '../components';
import heroPic from '../assets/heroPic.svg';

const Landing = () => {
	return (
		<div className='container mx-auto px-4'>
			<nav className='py-10'>
				<Logo width='13rem' />
			</nav>
			<div className='grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-150.453px)] content-center items-center gap-y-14 md:gap-y-0 justify-items-center md:gap-x-7'>
				<div className='flex flex-col space-y-7'>
					<div className='text-3xl text-center font-bold'>
						<h1 className='text-primaryBrandColor'>Connecting</h1>
						<h1>Content Creator and Brand</h1>
					</div>
					<div className='flex flex-col items-center space-y-5'>
						<div className='flex justify-center space-x-5'>
							<Link to='/register' className='main-btn'>
								Register
							</Link>
							<Link to='/login' className='main-btn'>
								Login / Demo User
							</Link>
						</div>
						<Link
							to='/privacy-policy'
							className='text-sm text-primaryBrandColor hover:underline'
						>
							Privacy Policy
						</Link>
					</div>
				</div>
				<img src={heroPic} alt='Hero' className='w-3/4 md:w-full' />
			</div>
		</div>
	);
};

export default Landing;
