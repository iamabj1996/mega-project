import { Router } from 'express';
import {
	getApplicationStats,
	getCurrentUser,
	updateUser,
} from '../controllers/userController.js';
import { validateAndUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
	authorizePermissions('admin'),
	getApplicationStats,
]);
router.patch('/update-user', validateAndUpdateUserInput, updateUser);

export default router;
