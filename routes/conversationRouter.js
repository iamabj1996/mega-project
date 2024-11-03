import { Router } from 'express';
import {
	createNewConversation,
	getConversationsOfUser,
} from '../controllers/conversationController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';

const router = Router();

router
	.route('/')
	.post(authorizePermissions('brand', 'influencer'), createNewConversation)
	.get(authorizePermissions('brand', 'influencer'), getConversationsOfUser);

export default router;
