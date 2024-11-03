import {
	FaInstagram,
	FaFacebookF,
	FaTwitter,
	FaYoutube,
	FaEdit,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useBrandProfileContext } from './BrandProfileLayout';

export default function BrandProfile() {
	const { brandProfile } = useBrandProfileContext();

	if (!brandProfile) {
		return (
			<div className='min-h-screen flex flex-col justify-center items-center space-y-4 bg-gradient-to-br from-lightMainBg to-primaryBrandColor/10 dark:from-darkMainBg dark:to-primaryBrandColor/20'>
				<h2 className='text-2xl font-bold text-center'>
					Your brand story is waiting to be told!
				</h2>
				<p className='text-lg text-center max-w-md'>
					Create your brand profile and start connecting with amazing creators.
				</p>
				<button className='bg-primaryBrandColor text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-primaryBrandColor/90 transition-colors'>
					Create Brand Profile
				</button>
			</div>
		);
	}

	const {
		logo = 'https://via.placeholder.com/150',
		brandName = '',
		tagline = '',
		description = '',
		identity = {},
		socialMedia = {},
		communityEngagement = {},
		resources = {},
	} = brandProfile;

	const { mission, vision, coreValues = [], personality = [] } = identity;
	const { instagram, facebook, twitter, youtube } = socialMedia;
	const { collaborations = [] } = communityEngagement;
	const { websiteLink } = resources;

	const socialLinks = [
		{ icon: FaInstagram, url: instagram, name: 'Instagram' },
		{ icon: FaFacebookF, url: facebook, name: 'Facebook' },
		{ icon: FaTwitter, url: twitter, name: 'Twitter' },
		{ icon: FaYoutube, url: youtube, name: 'YouTube' },
	];

	const MissingInfo = ({ children }) => (
		<p className='text-lightTextIcons1 dark:text-darkTextIcons1 italic text-sm'>
			{children}
		</p>
	);

	return (
		<div className='min-h-screen bg-gradient-to-br  text-lightTextIcons1 dark:text-darkTextIcons1'>
			<main className='container mx-auto px-4 py-12 space-y-16 relative'>
				{/* Edit Button */}
				<Link
					to={`edit/${brandProfile?._id}`}
					className='absolute top-6 right-6 bg-primaryBrandColor text-white p-3 rounded-full shadow-lg hover:bg-primaryBrandColor/90 transition-colors'
				>
					<FaEdit size={20} />
				</Link>

				{/* Brand Header Section */}
				<section className='text-center space-y-6'>
					<img
						src={logo}
						alt={`${brandName} Logo`}
						className='mx-auto h-32 w-32 rounded-full shadow-lg object-cover'
					/>
					<h1 className='text-4xl md:text-5xl font-bold'>{brandName}</h1>
					{tagline ? (
						<h2 className='text-2xl md:text-3xl font-light text-primaryBrandColor'>
							{tagline}
						</h2>
					) : (
						<MissingInfo>
							Add a catchy tagline to make your brand memorable!
						</MissingInfo>
					)}
					{description ? (
						<p className='max-w-2xl mx-auto text-lg'>{description}</p>
					) : (
						<MissingInfo>
							Tell your brand's story here. What makes you unique?
						</MissingInfo>
					)}
				</section>

				{/* Brand Identity Section */}
				<section className='bg-white dark:bg-darkCardBg rounded-xl shadow-lg p-8 space-y-8'>
					<h3 className='text-2xl font-bold text-center mb-6'>
						Brand Identity
					</h3>
					<div className='grid md:grid-cols-2 gap-8'>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-primaryBrandColor'>
								Mission Statement
							</h4>
							{mission ? (
								<p className='text-base'>{mission}</p>
							) : (
								<MissingInfo>
									Define your mission. What drives your brand forward?
								</MissingInfo>
							)}
						</div>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-primaryBrandColor'>
								Vision Statement
							</h4>
							{vision ? (
								<p className='text-base'>{vision}</p>
							) : (
								<MissingInfo>
									Share your vision. Where do you see your brand in the future?
								</MissingInfo>
							)}
						</div>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-primaryBrandColor'>
								Core Values
							</h4>
							{coreValues.length > 0 ? (
								<ul className='list-disc list-inside text-base'>
									{coreValues.map((value, index) => (
										<li key={index}>{value}</li>
									))}
								</ul>
							) : (
								<MissingInfo>
									List your core values. What principles guide your brand?
								</MissingInfo>
							)}
						</div>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-primaryBrandColor'>
								Brand Personality
							</h4>
							{personality.length > 0 ? (
								<p className='text-base'>{personality.join(', ')}</p>
							) : (
								<MissingInfo>
									Describe your brand's personality. Are you bold, friendly,
									innovative?
								</MissingInfo>
							)}
						</div>
					</div>
				</section>

				{/* Community Engagement Section */}
				<section className='bg-white dark:bg-darkCardBg rounded-xl shadow-lg p-8'>
					<h3 className='text-2xl font-bold text-center mb-6'>
						Community Engagement
					</h3>
					{collaborations.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 min-h-44 max-h-44 overflow-y-scroll'>
							{collaborations.map((collabId, index) => (
								<div key={index} className='text-base'>
									{collabId}
								</div>
							))}
						</div>
					) : (
						<MissingInfo>
							Start collaborating with creators to bring your brand to life!
						</MissingInfo>
					)}
				</section>

				{/* Social Media Section */}
				<section className='text-center space-y-6'>
					<h3 className='text-2xl font-bold'>Social Media Presence</h3>
					<div className='flex justify-center space-x-6'>
						{socialLinks.some((link) => link.url) ? (
							socialLinks.map(({ icon: Icon, url, name }, index) =>
								url ? (
									<a
										key={index}
										href={url}
										target='_blank'
										rel='noopener noreferrer'
										className='text-primaryBrandColor hover:text-primaryBrandColor/80 transition-colors'
									>
										<Icon size={32} />
									</a>
								) : null
							)
						) : (
							<MissingInfo>
								Connect with creators by adding your social media links!
							</MissingInfo>
						)}
					</div>
				</section>

				{/* Resources Section */}
				<section className='text-center'>
					{websiteLink ? (
						<a
							href={websiteLink}
							target='_blank'
							rel='noopener noreferrer'
							className='text-primaryBrandColor hover:underline font-semibold text-lg'
						>
							Visit Our Website
						</a>
					) : (
						<MissingInfo>
							Add your website link to give creators a deeper look into your
							brand's world.
						</MissingInfo>
					)}
				</section>
			</main>
		</div>
	);
}
