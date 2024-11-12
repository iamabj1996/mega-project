import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import {
	Logo,
	FormRow,
	CountrySelect,
	MultipleCategorySelect,
} from '../components';
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

	data.categories = data.categories
		? data.categories
				.split(',')
				.map((category) => category.trim().toLowerCase())
		: [];

	try {
		await customFetch.post('/auth/register', data);
		toast.success('Registration successful');
		return redirect('/login');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const categories = [
	{
		value: 'general-lifestyle-and-personal-interests',
		label: 'General Lifestyle & Personal Interests',
	},
	{ value: 'fashion', label: 'Fashion' },
	{ value: 'beauty-and-personal-care', label: 'Beauty & Personal Care' },
	{ value: 'travel-and-adventure', label: 'Travel & Adventure' },
	{ value: 'health-and-wellness', label: 'Health & Wellness' },
	{ value: 'food-and-cooking', label: 'Food & Cooking' },
	{ value: 'fitness-and-sports', label: 'Fitness & Sports' },
	{ value: 'home-and-living', label: 'Home & Living' },
	{ value: 'parenting-and-family', label: 'Parenting & Family' },
	{ value: 'diy-and-crafts', label: 'DIY & Crafts' },
	{
		value: 'personal-development-and-motivation',
		label: 'Personal Development & Motivation',
	},
	{ value: 'entertainment-and-culture', label: 'Entertainment & Culture' },
	{ value: 'music', label: 'Music' },
	{ value: 'film-and-television', label: 'Film & Television' },
	{ value: 'books-and-literature', label: 'Books & Literature' },
	{ value: 'art-and-design', label: 'Art & Design' },
	{ value: 'photography-and-videography', label: 'Photography & Videography' },
	{ value: 'gaming', label: 'Gaming' },
	{ value: 'humor-and-memes', label: 'Humor & Memes' },
	{ value: 'pop-culture-and-celebrities', label: 'Pop Culture & Celebrities' },
	{ value: 'technology-and-business', label: 'Technology & Business' },
	{ value: 'tech-and-gadgets', label: 'Tech & Gadgets' },
	{
		value: 'business-and-entrepreneurship',
		label: 'Business & Entrepreneurship',
	},
	{ value: 'finance-and-investing', label: 'Finance & Investing' },
	{ value: 'marketing-and-social-media', label: 'Marketing & Social Media' },
	{ value: 'real-estate', label: 'Real Estate' },
	{ value: 'education-and-learning', label: 'Education & Learning' },
	{ value: 'science-and-innovation', label: 'Science & Innovation' },
	{ value: 'luxury-and-lifestyle', label: 'Luxury & Lifestyle' },
	{ value: 'cars-and-motorcycles', label: 'Cars & Motorcycles' },
	{ value: 'pets-and-animals', label: 'Pets & Animals' },
	{
		value: 'spirituality-and-mindfulness',
		label: 'Spirituality & Mindfulness',
	},
	{
		value: 'environmental-and-sustainability',
		label: 'Environmental & Sustainability',
	},
	{ value: 'fashion-design-and-modeling', label: 'Fashion Design & Modeling' },
	{ value: 'interior-design-and-decor', label: 'Interior Design & Decor' },
	{ value: 'weddings-and-events', label: 'Weddings & Events' },
	{ value: 'social-causes-and-activism', label: 'Social Causes & Activism' },
	{ value: 'mental-health-awareness', label: 'Mental Health Awareness' },
	{ value: 'lgbtq-advocacy', label: 'LGBTQ+ Advocacy' },
	{ value: 'diversity-and-inclusion', label: 'Diversity & Inclusion' },
	{ value: 'women-empowerment', label: 'Women Empowerment' },
	{ value: 'community-and-social-impact', label: 'Community & Social Impact' },
	{ value: 'seasonal-and-trend-based', label: 'Seasonal & Trend-Based' },
	{
		value: 'holiday-and-seasonal-content',
		label: 'Holiday & Seasonal Content',
	},
	{ value: 'lifestyle-trends', label: 'Lifestyle Trends' },
	{ value: 'esports', label: 'Esports' },
	{
		value: 'outdoor-and-adventure-sports',
		label: 'Outdoor & Adventure Sports',
	},
	{ value: 'agriculture-and-farming', label: 'Agriculture & Farming' },
	{ value: 'skincare-and-dermatology', label: 'Skincare & Dermatology' },
	{
		value: 'automotive-modifications-and-accessories',
		label: 'Automotive Modifications & Accessories',
	},
	{
		value: 'cryptocurrency-and-blockchain',
		label: 'Cryptocurrency & Blockchain',
	},
	{
		value: 'body-positivity-and-self-care',
		label: 'Body Positivity & Self-Care',
	},
	{ value: 'vintage-and-collectibles', label: 'Vintage & Collectibles' },
	{
		value: 'public-speaking-and-communication-skills',
		label: 'Public Speaking & Communication Skills',
	},
	{ value: 'hospitality-and-tourism', label: 'Hospitality & Tourism' },
	{ value: 'healthcare-and-medical', label: 'Healthcare & Medical' },
	{ value: 'legal-and-compliance', label: 'Legal & Compliance' },
	{
		value: 'manufacturing-and-industrial',
		label: 'Manufacturing & Industrial',
	},
];

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
									disabled={true}
								/>
							</div>
							<div className='col-span-1 md:col-span-2'>
								<MultipleCategorySelect
									name='categories'
									labelText='Category'
									options={categories}
									selectedOptions={[]}
									onChange={(selectedCategories) =>
										console.log(selectedCategories)
									}
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
