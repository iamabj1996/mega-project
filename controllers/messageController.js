import { StatusCodes } from 'http-status-codes';
import Message from '../models/messageModel.js';

export const createNewMessage = async (req, res) => {
	const { conversationId, sender, text } = req.body;
	const newMessage = await Message.create({ conversationId, sender, text });
	res.status(StatusCodes.CREATED).json({ message: newMessage });
};

export const getAllMessagesOfConversation = async (req, res) => {
	const messages = await Message.find({
		conversationId: req.params.conversationId,
	});
	res.status(StatusCodes.OK).json({ messages });
};
