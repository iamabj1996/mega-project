import { Router } from 'express';
import {
	createNewMessage,
	getAllMessagesOfConversation,
} from '../controllers/messageController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
const router = Router();

router
	.route('/')
	.post(authorizePermissions('brand', 'influencer'), createNewMessage);

router
	.route('/:conversationId')
	.get(
		authorizePermissions('brand', 'influencer'),
		getAllMessagesOfConversation
	);

export default router;
