import { BadRequestError } from '../errors/customErrors.js';
import Contract from '../models/contractModel.js';
import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllContracts = async (req, res) => {
	const userId = req.user.userId;

	const contracts = await Contract.find({
		$or: [{ brand: userId }, { influencer: userId }],
	});

	const populatedContracts = await Promise.all(
		contracts.map(async (contract) => {
			const brand = await User.findById(contract.brand).select('name');
			const influencer = await User.findById(contract.influencer).select(
				'name'
			);

			return {
				...contract.toObject(), // Convert Mongoose document to a plain object
				brand: brand
					? { id: brand._id, name: brand.name }
					: { id: null, name: 'Unknown' },
				influencer: influencer
					? { id: influencer._id, name: influencer.name }
					: { id: null, name: 'Unknown' },
			};
		})
	);

	res.status(StatusCodes.OK).json({
		contracts: populatedContracts,
	});
};

export const getSingleContract = async (req, res) => {
	const { id } = req.params;
	const contract = await Contract.findById(id);
	const { brand, influencer } = contract;
	if (brand !== req.user.userId && influencer !== req.user.userId) {
		throw new BadRequestError('Not Authorized');
	}
	const [brandUser, influencerUser] = await Promise.all([
		User.findById(brand).select('name'),
		User.findById(influencer).select('name'),
	]);

	// Add the names to the contract object
	const populatedContract = {
		...contract.toObject(),
		brand: brandUser
			? { id: brandUser.id, name: brandUser.name }
			: { id: '', name: '' },
		influencer: influencerUser
			? { id: influencerUser.id, name: influencerUser.name }
			: { id: '', name: '' },
	};

	res.status(StatusCodes.OK).json({ contract: populatedContract });
};

export const createNewContract = async (req, res) => {
	req.body.brand = req.user.userId;
	const contract = await Contract.create(req.body);
	res.status(StatusCodes.CREATED).json({ contract });
};

export const updateContract = async (req, res) => {
	const { id } = req.params;

	const contract = await Contract.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(StatusCodes.OK).json({ contract });
};
