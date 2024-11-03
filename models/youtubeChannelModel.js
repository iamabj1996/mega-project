import mongoose from 'mongoose';

const YoutubeChannelSchema = new mongoose.Schema(
	{
		channelLogo: {
			type: String,
		},
		channelId: {
			type: String,
		},
		name: {
			type: String,
		},
		category: [
			{
				type: String,
			},
		],
		subscribers: {
			type: String,
		},
		avgViews: {
			type: String,
		},
		engagement: {
			type: String,
		},
		uploadFrequency: {
			type: String,
		},
		demographics: {
			type: String,
		},
		collaborations: [
			{
				type: String,
			},
		],
		cpm: {
			type: String,
		},
		ownedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},

		videoData: [
			{
				title: {
					type: String,
				},
				thumbnail: {
					type: String,
				},
				category: [
					{
						type: String,
					},
				],
				viewCount: {
					type: String,
				},
				likeCount: {
					type: String,
				},
				commentCount: {
					type: String,
				},
				uploadDate: {
					type: String,
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('YoutubeChannel', YoutubeChannelSchema);
