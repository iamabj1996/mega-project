import { body, validationResult, param, query } from 'express-validator';
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '../errors/customErrors.js';
import mongoose from 'mongoose';
import YoutubeChannel from '../models/youtubeChannelModel.js';
import InstagramCreator from '../models/instagramCreatorModel.js';
import BrandProfile from '../models/brandProfileModel.js';
import User from '../models/userModel.js';

const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((error) => error.msg);
				if (errorMessages[0].startsWith('No youtube channel')) {
					throw new NotFoundError(errorMessages);
				}
				if (errorMessages[0].startsWith('Not authorized')) {
					throw new UnauthorizedError('Not authorized to access this route');
				}
				throw new BadRequestError(errorMessages);
			}

			next();
		},
	];
};

export const validateTest = withValidationErrors([
	body('name')
		.notEmpty()
		.withMessage('Name is required')
		.isLength({ min: 3, max: 50 })
		.withMessage('Name must be 3 and 50 characters long')
		.trim(),
]);

export const validateIdParam = withValidationErrors([
	param('id').custom(async (value, { req }) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('Invalid MongoDB id');

		const youtubeChannel = await YoutubeChannel.findById(value);
		if (!youtubeChannel)
			throw new NotFoundError(`No youtube channel with id ${value}`);

		const isAdmin = req.user.role === 'admin';
		const isOwner = req.user.userId === youtubeChannel.ownedBy.toString();

		if (!isOwner && !isAdmin) {
			throw new UnauthorizedError('Not authorized to access this route');
		}
	}),
]);

export const validateIdParamInstagram = withValidationErrors([
	param('id').custom(async (value, { req }) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('Invalid MongoDB id');

		const instagramCreator = await InstagramCreator.findById(value);
		if (!instagramCreator)
			throw new NotFoundError(`No youtube channel with id ${value}`);

		const isAdmin = req.user.role === 'admin';
		const isOwner = req.user.userId === instagramCreator.ownedBy.toString();

		if (!isOwner && !isAdmin) {
			throw new UnauthorizedError('Not authorized to access this route');
		}
	}),
]);

export const validateRegisterInput = withValidationErrors([
	body('name').notEmpty().withMessage('Name is required'),
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format')
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) {
				throw new BadRequestError('Email already exist');
			}
		}),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Passport must have minimum 8 characters'),
	body('location').notEmpty().withMessage('Location is required'),
	body('lastName').notEmpty().withMessage('Last name is required'),
]);

export const validateLoginInput = withValidationErrors([
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format'),

	body('password').notEmpty().withMessage('Password is required'),
]);

export const validateCreateContractInput = withValidationErrors([
	body('campaign').notEmpty().withMessage('Campaign Name is required'),
	body('status').notEmpty().withMessage('Status is required'),
	body('startDate').notEmpty().withMessage('Start date is required'),
	body('endDate').notEmpty().withMessage('End date is required'),
	body('amount').notEmpty().withMessage('Amount is required'),
	body('currency').notEmpty().withMessage('Currency is required'),
	body('stage').notEmpty().withMessage('Stage is required'),
	body('nextMilestone').notEmpty().withMessage('Next milestone is required'),
	body('deliverables').notEmpty().withMessage('Deliverables is required'),
	body('paymentStatus').notEmpty().withMessage('Payment status is required'),
]);

export const validateAndUpdateUserInput = withValidationErrors([
	body('name').notEmpty().withMessage('Name is required'),
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format')
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequestError('Email already exist');
			}
		}),
	body('location').notEmpty().withMessage('Location is required'),
	body('lastName').notEmpty().withMessage('Last name is required'),
]);

export const validateYoutubeCallback = withValidationErrors([
	query('code')
		.notEmpty()
		.withMessage('Authorization code is missing')
		.isString()
		.withMessage('Authorization code must be a valid string'),
]);

export const validateContractUpdate = withValidationErrors([
	body('campaign').notEmpty().withMessage('Campaign Name is required'),
	body('status').notEmpty().withMessage('Status is required'),
	body('startDate').notEmpty().withMessage('Start date is required'),
	body('endDate').notEmpty().withMessage('End date is required'),
	body('amount').notEmpty().withMessage('Amount is required'),
	body('currency').notEmpty().withMessage('Currency is required'),
	body('stage').notEmpty().withMessage('Stage is required'),
	body('nextMilestone').notEmpty().withMessage('Next milestone is required'),
	body('deliverables').notEmpty().withMessage('Deliverables is required'),
	body('paymentStatus').notEmpty().withMessage('Payment status is required'),
	body().custom((_, { req }) => {
		const { brand, influencer } = req.body;
		const userId = req.user.userId;
		// Check if the user is either the brand or influencer
		if (brand !== userId && influencer !== userId) {
			throw new BadRequestError('Not authorized to update this contract.');
		}

		return true; // Validation passes
	}),
]);

export const validateBrandProfileIdParam = withValidationErrors([
	param('id').custom(async (value, { req }) => {
		// Check if the ID is a valid MongoDB ObjectId
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('Invalid MongoDB id');

		// Check if the BrandProfile exists
		const brandProfile = await BrandProfile.findById(value);
		if (!brandProfile) {
			throw new NotFoundError(`No brand profile found with id ${value}`);
		}
	}),
]);

export const validateCreateBrandProfile = withValidationErrors([
	body('brandName').notEmpty().withMessage('Brand Name is required'),
]);

export const validateBrandProfileUpdate = withValidationErrors([
	param('id').custom(async (value, { req }) => {
		// Check if the ID is a valid MongoDB ObjectId
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('Invalid MongoDB id');

		// Check if the BrandProfile exists
		const brandProfile = await BrandProfile.findById(value);
		if (!brandProfile) {
			throw new NotFoundError(`No brand profile found with id ${value}`);
		}
	}),
	body('brandName').notEmpty().withMessage('Brand Name is required'),
	body().custom((_, { req }) => {
		const { ownedBy } = req.body;
		const userId = req.user.userId;
		// Check if the user is either the brand or influencer
		if (ownedBy !== userId) {
			throw new BadRequestError('Not authorized to update this brand profile');
		}

		return true; // Validation passes
	}),
]);
