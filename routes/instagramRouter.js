import { Router } from 'express';
const router = Router();
import {
	authorizePermissions,
	checkForTestUserBrandAndCreator,
} from '../middleware/authMiddleware.js';

import {
	authorizeInstagram,
	authorizeInstagramCallback,
	getAllInstagramPages,
	getInstagramPagesForSearch,
} from '../controllers/instagramController.js';

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

export default router;
