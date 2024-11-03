import { Router } from 'express';

import {
	authenticateUser,
	authorizePermissions,
} from '../middleware/authMiddleware.js';
import {
	createNewBrandProfile,
	getBrandProfileInfoById,
	getBrandProfileInfoLoggedInUser,
	updateExistingBrandProfile,
} from '../controllers/brandProfileController.js';
import {
	validateBrandProfileIdParam,
	validateBrandProfileUpdate,
	validateCreateBrandProfile,
} from '../middleware/validationMiddleware.js';

const router = Router();

router
	.route('/')
	.get(
		authenticateUser,
		authorizePermissions('brand'),
		getBrandProfileInfoLoggedInUser
	)
	.post(
		authenticateUser,
		authorizePermissions('brand'),
		validateCreateBrandProfile,
		createNewBrandProfile
	);

router
	.route('/:id')
	.get(validateBrandProfileIdParam, getBrandProfileInfoById)
	.patch(
		authenticateUser,
		authorizePermissions('brand'),
		validateBrandProfileUpdate,
		updateExistingBrandProfile
	);

export default router;
