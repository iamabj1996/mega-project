import Conversation from '../models/conversationModel.js';
import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

export const createNewConversation = async (req, res) => {
	const senderProfile = await User.findOne({ _id: req.body.senderId });
	const senderProfileWithoutPassword = senderProfile.toJSON();

	const receiverProfile = await User.findOne({ _id: req.body.receiverId });
	const receiverProfileWithoutPassword = receiverProfile.toJSON();
	const newConversation = new Conversation({
		members: [senderProfileWithoutPassword, receiverProfileWithoutPassword],
	});
	await newConversation.save();
	res.status(StatusCodes.CREATED).json({ conversation: newConversation });
};

export const getConversationsOfUser = async (req, res) => {
	const conversation = await Conversation.find({
		'members._id': new ObjectId(req.user.userId),
	});

	res.status(StatusCodes.OK).json({ conversation });
};
