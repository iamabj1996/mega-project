import { Router } from 'express';
const router = Router();

import {
	getAllYoutubeChannels,
	getYoutubeChannel,
	deleteYoutubeChannel,
	authorizeYoutubeChannel,
	authorizeYoutubeCallback,
	getYoutubeChannelForSearch,
} from '../controllers/youtubeChannelController.js';
import {
	validateIdParam,
	validateYoutubeCallback,
} from '../middleware/validationMiddleware.js';
import {
	authorizePermissions,
	checkForTestUserBrandAndCreator,
} from '../middleware/authMiddleware.js';

router
	.route('/')
	.get(authorizePermissions('influencer'), getAllYoutubeChannels);

router
	.route('/search_creators')
	.get(authorizePermissions('brand'), getYoutubeChannelForSearch);

router
	.route('/auth')
	.get(
		checkForTestUserBrandAndCreator,
		authorizePermissions('influencer'),
		authorizeYoutubeChannel
	);

router
	.route('/auth/google/callback')
	.get(
		checkForTestUserBrandAndCreator,
		authorizePermissions('influencer'),
		validateYoutubeCallback,
		authorizeYoutubeCallback
	);

router
	.route('/:id')
	.get(authorizePermissions('brand', 'free_user'), getYoutubeChannel) // add validateIdParam HERE (DO NOT FORGET)
	.delete(
		checkForTestUserBrandAndCreator,
		validateIdParam,
		deleteYoutubeChannel
	);

export default router;
