import { Router } from 'express';
import {
	createNewContract,
	getAllContracts,
	getSingleContract,
	updateContract,
} from '../controllers/contractController.js';
import {
	authorizePermissions,
	checkForTestUserBrandAndCreator,
} from '../middleware/authMiddleware.js';
import {
	validateContractUpdate,
	validateCreateContractInput,
} from '../middleware/validationMiddleware.js';
const router = Router();

router.get('/', authorizePermissions('brand', 'influencer'), getAllContracts);

router.get(
	'/:id',
	authorizePermissions('brand', 'influencer'),
	getSingleContract
);

router.post(
	'/',
	checkForTestUserBrandAndCreator,
	authorizePermissions('brand'),
	validateCreateContractInput,
	createNewContract
);

router.patch(
	'/:id',
	checkForTestUserBrandAndCreator,
	validateContractUpdate,
	updateContract
);

export default router;
