import { Router } from 'express';
const router = Router();
import {
	authorizePermissions,
	checkForTestUserBrandAndCreator,
} from '../middleware/authMiddleware.js';

import {
	authorizeInstagram,
	authorizeInstagramCallback,
	deleteInstagramCreator,
	getAllInstagramPages,
	getInstagramPagesForSearch,
} from '../controllers/instagramController.js';
import { validateIdParamInstagram } from '../middleware/validationMiddleware.js';

router.route('/').get(authorizePermissions('influencer'), getAllInstagramPages);

router
	.route('/auth')
	.get(
		checkForTestUserBrandAndCreator,
		authorizePermissions('influencer'),
		authorizeInstagram
	);
router
	.route('/auth/callback')
	.get(
		checkForTestUserBrandAndCreator,
		authorizePermissions('influencer'),
		authorizeInstagramCallback
	);

router
	.route('/search_creators')
	.get(authorizePermissions('brand', 'free_user'), getInstagramPagesForSearch);

router
	.route('/:id')
	.delete(
		checkForTestUserBrandAndCreator,
		validateIdParamInstagram,
		deleteInstagramCreator
	);

export default router;
