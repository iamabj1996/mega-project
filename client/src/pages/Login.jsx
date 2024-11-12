import {
	Link,
	Form,
	redirect,
	useNavigation,
	useNavigate,
} from 'react-router-dom';
import { Logo, FormRow } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const formInputData = Object.fromEntries(formData);
	try {
		const reponseData = await customFetch.post('/auth/login', formInputData);
		const { data } = reponseData;
		const { user } = data;
		toast.success('Login successful');
		if (user.role === 'brand') {
			return redirect('/dashboard/contract');
		}
		if (user.role === 'influencer') {
			return redirect('/dashboard/messages');
		}
		if (user.role === 'free_user') {
			return redirect('/dashboard/search-creators');
		}
		return redirect('/dashboard/search-creators');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const Login = () => {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const isSubmitting = navigation.state === 'submitting';

	const loginDemoBrandUser = async () => {
		try {
			const reponseData = await customFetch.post('/auth/login', {
				email: 'demo.influencer@gmail.com',
				password: '12345678',
			});
			const { data } = reponseData;
			const { user } = data;
			toast.success('Take a test drive as a brand');
			if (user.role === 'brand') {
				navigate('/dashboard/contract');
			}
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		}
	};

	const loginDemoInfluencerUser = async () => {
		try {
			const reponseData = await customFetch.post('/auth/login', {
				email: 'demo1.influencer@gmail.com',
				password: '12345678',
			});
			const { data } = reponseData;
			const { user } = data;
			toast.success('Take a test drive as an creator');
			if (user.role === 'influencer') {
				navigate('/dashboard/contract');
			}
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen px-4'>
			<div className='w-full max-w-md bg-lightCardBg dark:bg-darkCardBg rounded-lg shadow border-t-4 border-t-primaryBrandColor'>
				<div className='flex justify-center mt-4'>
					<Logo width='13rem' />
				</div>

				<div className='p-6 md:p-8 space-y-4 md:space-y-6'>
					<h1 className='text-2xl font-bold leading-tight tracking-tight text-lightTextIcons1 dark:text-darkTextIcons1'>
						Login
					</h1>
					<Form method='post'>
						<div className='grid grid-cols-1 gap-y-3'>
							<FormRow type='email' name='email' />
							<FormRow type='password' name='password' />
						</div>

						<button
							type='submit'
							className='main-btn w-full mt-6'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Submitting...' : 'Login'}
						</button>

						<button
							type='button'
							className='main-btn w-full mt-6'
							onClick={loginDemoBrandUser}
						>
							Explore As Guest (Brand)
						</button>

						<button
							type='button'
							className='main-btn w-full mt-6'
							onClick={loginDemoInfluencerUser}
						>
							Explore As Guest (Creator)
						</button>
						<p className='text-sm font-light text-lightTextIcons2 dark:text-darkTextIcons2 mt-2'>
							Not a member yet?
							<Link
								to='/register'
								className='font-medium text-primaryBrandColor hover:underline underline-offset-4 ml-2'
							>
								Register here
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</div>
	);
};
export default Login;
