import React from 'react';

const PrivacyPolicy = () => {
	const effectiveDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className='min-h-screen bg-lightMainBg dark:bg-darkMainBg text-lightTextIcons1 dark:text-darkTextIcons1'>
			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				<h1 className='text-3xl font-bold mb-6 text-primaryBrandColor'>
					Privacy Policy
				</h1>
				<p className='mb-4'>Effective Date: {effectiveDate}</p>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>Introduction</h2>
					<p className='mb-4'>
						Welcome to AbronicLink, owned and operated by AbronicLink
						Technologies Private Limited ("we," "us," "our"). This Privacy
						Policy explains how we collect, use, share, and protect your
						personal information in compliance with applicable laws and
						Facebook's guidelines, especially regarding the use of Instagram
						Graph API data. By using AbronicLink, you agree to the terms
						outlined in this policy.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>
						1. Information We Collect
					</h2>
					<h3 className='text-xl font-medium mb-2'>1.1 Instagram Data</h3>
					<p className='mb-4'>
						Through Instagram Graph API, we collect data from Instagram to
						connect brands and content creators effectively. This includes
						public profile information, insights, and other data permitted by
						Instagram, strictly for the purpose of facilitating meaningful brand
						collaborations.
					</p>
					<h3 className='text-xl font-medium mb-2'>1.2 Personal Information</h3>
					<p className='mb-4'>
						We may also collect personal information you provide directly, such
						as:
					</p>
					<ul className='list-disc pl-6 mb-4'>
						<li>Name, email, and contact details for account creation.</li>
						<li>Payment information to process transactions.</li>
					</ul>
					<h3 className='text-xl font-medium mb-2'>1.3 Usage Data</h3>
					<p className='mb-4'>
						We collect data on your interactions within our platform to enhance
						user experience and improve platform functionality. This may include
						login times, search preferences, and interactions with other users.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>
						2. How We Use Your Information
					</h2>
					<p className='mb-4'>We use collected information to:</p>
					<ul className='list-disc pl-6 mb-4'>
						<li>Connect brands and creators for potential collaborations.</li>
						<li>
							Enhance platform security, customize user experience, and improve
							site features.
						</li>
						<li>Comply with legal and regulatory obligations.</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>
						3. Sharing of Information
					</h2>
					<p className='mb-4'>
						We do not sell or share your personal data with third parties except
						in the following cases:
					</p>
					<ul className='list-disc pl-6 mb-4'>
						<li>With consent from you to connect with brands.</li>
						<li>
							For legal compliance with requests from government authorities or
							as required by law.
						</li>
						<li>
							With authorized service providers for platform maintenance and
							functionality (bound by confidentiality agreements).
						</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>
						4. Use of Instagram Graph API
					</h2>
					<p className='mb-4'>
						Our use of Instagram data adheres strictly to Facebook's platform
						policies:
					</p>
					<ul className='list-disc pl-6 mb-4'>
						<li>
							We only access data permitted under the Instagram Graph API and
							use it solely for facilitating brand-creator connections.
						</li>
						<li>
							We do not use Instagram data for unrelated purposes, nor do we
							share, or display this data outside the platform.
						</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>
						5. Data Retention and Security
					</h2>
					<p className='mb-4'>
						We retain your data only as necessary for business purposes or as
						required by law. AbronicLink employs industry-standard security
						measures to protect your data from unauthorized access, alteration,
						or disclosure.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>6. Your Rights</h2>
					<p className='mb-4'>You have the right to:</p>
					<ul className='list-disc pl-6 mb-4'>
						<li>Access, correct, or delete your personal information.</li>
						<li>
							Withdraw consent at any time to prevent further data collection
							via Instagram.
						</li>
						<li>Request a copy of the information we store about you.</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>
						7. Changes to the Privacy Policy
					</h2>
					<p className='mb-4'>
						This Privacy Policy may be updated to reflect changes in our
						practices or for regulatory reasons. We will notify you of
						significant changes via email or a notice on our platform.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>8. Contact Us</h2>
					<p className='mb-4'>
						For any questions or concerns about this Privacy Policy, please
						contact us at:
					</p>
					<p className='mb-2'>AbronicLink Technologies Private Limited</p>
					<p>
						Email:{' '}
						<a
							href='mailto:privacy@abroniclink.com'
							className='text-primaryBrandColor hover:underline'
						>
							support@abroniclink.com
						</a>
					</p>
				</section>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
