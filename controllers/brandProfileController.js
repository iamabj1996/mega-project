import BrandProfile from '../models/brandProfileModel.js';
import { StatusCodes } from 'http-status-codes';

export const getBrandProfileInfoLoggedInUser = async (req, res) => {
	const brandProfile = await BrandProfile.findOne({ ownedBy: req.user.userId });
	res.status(StatusCodes.OK).json({ brandProfile });
};

export const createNewBrandProfile = async (req, res) => {
	req.body.ownedBy = req.user.userId;
	const brandProfile = await BrandProfile.create(req.body);
	res.status(StatusCodes.CREATED).json({ brandProfile });
};

export const updateExistingBrandProfile = async (req, res) => {
	const { id } = req.params;

	const brandProfile = await BrandProfile.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(StatusCodes.OK).json({ brandProfile });
};

export const getBrandProfileInfoById = async (req, res) => {
	const brandProfile = await BrandProfile.findOne({ _id: req.params.id });
	res.status(StatusCodes.OK).json({ brandProfile });
};
