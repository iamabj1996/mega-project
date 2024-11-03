import { Router } from 'express';
import {
	createNewContract,
	getAllContracts,
	getSingleContract,
	updateContract,
} from '../controllers/contractController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
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
	authorizePermissions('brand'),
	validateCreateContractInput,
	createNewContract
);

router.patch('/:id', validateContractUpdate, updateContract);

export default router;
