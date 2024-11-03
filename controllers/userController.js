import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import YoutubeChannel from '../models/youtubeChannelModel.js';

export const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	const userWithoutPassword = user.toJSON();
	res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

//Admin Only
export const getApplicationStats = async (req, res) => {
	const users = await User.countDocuments();
	const youtubeChannels = await YoutubeChannel.countDocuments();
	res.status(StatusCodes.OK).json({ users, youtubeChannels });
};

export const updateUser = async (req, res) => {
	const obj = { ...req.body };
	delete obj.password;
	const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
	res.status(StatusCodes.OK).json({ msg: 'Update User' });
};
