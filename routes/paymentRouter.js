import { Router } from 'express';
import {
	authenticateUser,
	authorizePermissions,
} from '../middleware/authMiddleware.js';
import {
	createSubscription,
	paymentverificationForSubscription,
} from '../controllers/paymentController.js';

const router = Router();

//Buy Subscription

router
	.route('/subscribe')
	.get(authenticateUser, authorizePermissions('brand'), createSubscription);

router
	.route(
		'/subscription-verification/:paymentId/:subscription_id/:razorpay_signature'
	)
	.get(
		authenticateUser,
		authorizePermissions('brand'),
		paymentverificationForSubscription
	);

export default router;
