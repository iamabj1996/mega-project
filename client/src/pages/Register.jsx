import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { Logo, FormRow, CountrySelect } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	// Password confirmation logic
	if (data.password !== data.confirmPassword) {
		toast.error('Passwords do not match!');
		return null; // Prevents submission if passwords don't match
	}

	if (data.location === '') {
		toast.error('Location is mandatory');
		return null; // Prevents submission if passwords don't match
	}

	delete data.confirmPassword;

	try {
		await customFetch.post('/auth/register', data);
		toast.success('Registration successful');
		return redirect('/login');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const Register = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	// State to handle selected country
	const [selectedCountry, setSelectedCountry] = useState();

	return (
		<div className='flex items-center justify-center min-h-screen px-4'>
			<div className='w-full max-w-xl bg-lightCardBg dark:bg-darkCardBg rounded-lg shadow border-t-4 border-t-primaryBrandColor'>
				<div className='flex justify-center mt-4'>
					<Logo width='13rem' />
				</div>

				<div className='p-6 md:p-8 space-y-4 md:space-y-6'>
					<h1 className='text-2xl font-bold leading-tight tracking-tight text-lightTextIcons1 dark:text-darkTextIcons1'>
						Register
					</h1>

					<Form method='post'>
						<div className='grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-5'>
							{/* Email and Password */}
							<div className='col-span-1 md:col-span-2'>
								<FormRow type='email' name='email' labelText='Email Address' />
							</div>
							<FormRow type='password' name='password' labelText='Password' />
							<FormRow
								type='password'
								name='confirmPassword'
								labelText='Confirm Password'
							/>

							{/* User Type Dropdown */}
							<div className='col-span-1 md:col-span-2'>
								<label
									htmlFor='userType'
									className='block mb-2 text-sm font-medium text-lightTextIcons1 dark:text-darkTextIcons1 capitalize'
								>
									You are
								</label>
								<select
									name='role'
									id='userType'
									className='shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-lightTextIcons1 dark:text-darkTextIcons1 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryBrandColor dark:bg-darkMainBg'
									required
								>
									<option value='' disabled selected>
										Select an option
									</option>
									<option value='influencer'>Content Creator</option>
									<option value='brand'>Brand</option>
								</select>
							</div>

							{/* Name and Last Name */}
							<FormRow type='text' name='name' labelText='First Name' />
							<FormRow type='text' name='lastName' labelText='Last Name' />

							{/* Location with CountrySelect */}
							<div className='col-span-1 md:col-span-2'>
								<CountrySelect
									name='location'
									labelText='Location'
									defaultValue={selectedCountry}
									onChange={(value) => setSelectedCountry(value)}
									mandatory={true}
								/>
							</div>
						</div>

						<button
							type='submit'
							className='main-btn w-full mt-3'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Submitting....' : 'Create an account'}
						</button>

						<p className='text-sm font-light text-lightTextIcons2 dark:text-darkTextIcons2 mt-2'>
							Already have an account?{' '}
							<Link
								to='/login'
								className='font-medium text-primaryBrandColor hover:underline underline-offset-4 ml-2'
							>
								Login here
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Register;
