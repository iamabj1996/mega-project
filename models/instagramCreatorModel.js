import mongoose from 'mongoose';

const InsightSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	period: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	total_value: {
		value: {
			type: Number,
			required: true,
		},
	},
	id: {
		type: String,
		required: true,
	},
});

const InstagramCreatorSchema = new mongoose.Schema(
	{
		ownedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		instagramId: {
			type: String,
			required: true,
		},
		creatorName: {
			type: String,
			required: true,
		},
		creatorUserName: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			required: true,
		},
		followerCount: {
			type: Number,
			required: true,
		},
		followingCount: {
			type: Number,
			required: true,
		},
		mediaCount: {
			type: Number,
			required: true,
		},
		insights: [InsightSchema],
	},
	{ timestamps: true }
);

export default mongoose.model('InstagramCreator', InstagramCreatorSchema);
