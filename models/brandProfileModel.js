import mongoose from 'mongoose';

const BrandProfileSchema = new mongoose.Schema(
	{
		ownedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		logo: {
			type: String,
			required: true, // Assuming the logo is required
		},
		brandName: {
			type: String,
			required: true,
		},
		tagline: {
			type: String,
		},
		description: {
			type: String,
		},
		identity: {
			mission: {
				type: String,
			},
			vision: {
				type: String,
			},
			coreValues: [
				{
					type: String,
				},
			],
			personality: [
				{
					type: String,
				},
			],
		},
		socialMedia: {
			instagram: {
				type: String,
			},
			facebook: {
				type: String,
			},
			twitter: {
				type: String,
			},
			youtube: {
				type: String,
			},
		},
		communityEngagement: {
			collaborations: [
				{
					type: mongoose.Types.ObjectId,
					ref: 'User',
				},
			],
		},
		resources: {
			websiteLink: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

export default mongoose.model('BrandProfile', BrandProfileSchema);
