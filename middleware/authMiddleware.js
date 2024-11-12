import {
	BadRequestError,
	UnauthenicatedError,
	UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
	const { token } = req.cookies;
	if (!token) throw new UnauthenicatedError('Authentication is invalid');

	try {
		const { userId, role } = verifyJWT(token);
		const testUser =
			userId === '672db160d4afd14642fb0575' ||
			userId === '672ed4b304b0b5887da2257b';

		req.user = { userId, role, testUser };
		next();
	} catch (error) {
		throw new UnauthenicatedError('Authentication is invalid');
	}
};

export const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user?.role)) {
			throw new UnauthorizedError('Unauthorized to access this route');
		}

		next();
	};
};

export const checkForTestUserBrandAndCreator = (req, res, next) => {
	if (req?.user.testUser && req.user.role === 'brand')
		throw new BadRequestError(
			'Demo User, Join us as a brand with and exclusive offer of 3 months free trial!'
		);
	if (req?.user.testUser && req.user.role === 'influencer')
		throw new BadRequestError(
			'Demo User, Join us as a creator with and exclusive offer of 3 months free trial!'
		);
	next();
};
