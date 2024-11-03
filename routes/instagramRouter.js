import { Router } from 'express';
const router = Router();
import { authorizePermissions } from '../middleware/authMiddleware.js';

import {
	authorizeInstagram,
	authorizeInstagramCallback,
	getAllInstagramPages,
} from '../controllers/instagramController.js';

router.route('/').get(authorizePermissions('influencer'), getAllInstagramPages);
router
	.route('/auth')
	.get(authorizePermissions('influencer'), authorizeInstagram);
router
	.route('/auth/callback')
	.get(authorizePermissions('influencer'), authorizeInstagramCallback);

export default router;
