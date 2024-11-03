import { Link, useRouteError } from 'react-router-dom';
import errorPic from '../assets/error404.svg';
import somethingWentWrong from '../assets/somethingWentWrong.svg';

const Error = () => {
	const error = useRouteError();

	if (error.status === 404) {
		return (
			<div className='flex flex-col items-center justify-center space-y-16 h-screen container mx-auto px-4'>
				<img src={errorPic} />
				<Link to='/' className='main-btn'>
					Back Home
				</Link>
			</div>
		);
	}
	return (
		<div className='flex flex-col items-center justify-center space-y-16 h-screen container mx-auto px-4'>
			<img src={somethingWentWrong} />
			<p className='text-lg font-bold text-lightTextIcons1 dark:text-darkTextIcons1 '>
				Something Went Wrong
			</p>
			<Link to='/' className='main-btn'>
				Back Home
			</Link>
		</div>
	);
};
export default Error;
