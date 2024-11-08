import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenicatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
	const hashedPassword = await hashPassword(req.body.password);

	req.body.password = hashedPassword;

	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: 'User successfully created' });
};

export const login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	const isValidUser =
		user && (await comparePassword(req.body.password, user.password));

	if (!isValidUser) throw new UnauthenicatedError('Invalid Credentials');

	const token = createJWT({ userId: user._id, role: user.role });

	const oneDay = 1000 * 60 * 60 * 24;

	res.cookie('token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === 'production',
	});

	const userWithoutPassword = user.toJSON();

	res
		.status(StatusCodes.OK)
		.json({ msg: 'User logged in', user: userWithoutPassword });
};

export const logout = (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});

	res.status(StatusCodes.OK).json({ msg: 'User logged out' });
};
