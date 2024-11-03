import mongoose from 'mongoose';

const DeliverableSchema = new mongoose.Schema({
	platform: {
		type: String,
		enum: ['Instagram', 'Youtube'], // You can add more platforms if needed
		required: true,
	},
	contentType: {
		type: String,
		enum: ['Story', 'Post', 'Video'],
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
	},
});

const ContractSchema = new mongoose.Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		influencer: {
			type: String,
			required: true,
		},
		campaign: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['Proposal', 'Ongoing', 'Past'],
			default: 'Proposal',
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			default: 'USD',
		},
		stage: {
			type: String,
			enum: [
				'Proposal Sent',
				'Negotiating',
				'Finalized',
				'Content Creation',
				'Completed',
				'Terminated',
			],
			default: 'Proposal Sent',
		},
		nextMilestone: {
			type: Date,
		},
		deliverables: {
			type: [DeliverableSchema], // Array of objects following DeliverableSchema
			default: [],
		},
		paymentStatus: {
			type: String,
			enum: ['Advance Paid', 'Partial Payment', 'Pending', 'Paid'],
			default: 'Pending',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Contract', ContractSchema);
