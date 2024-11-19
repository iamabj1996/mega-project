import { razorpayInstance } from '../server.js';
import User from '../models/userModel.js';
import Payment from '../models/paymentModel.js';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import { BadRequestError } from '../errors/customErrors.js';

export const createSubscription = async (req, res) => {
	const user = await User.findById(req.user.userId);

	const subscription = await razorpayInstance.subscriptions.create({
		plan_id: 'plan_PLUDzn0gDc6MTg',
		customer_notify: 1,
		total_count: 12,
	});

	user.subscription.id = subscription.id;
	user.subscription.status = subscription.status;

	await user.save();

	res.status(StatusCodes.CREATED).json({
		success: true,
		subscriptionId: subscription.id,
	});
};

export const paymentverificationForSubscription = async (req, res) => {
	const { paymentId, subscription_id, razorpay_signature } = req.params;
	console.log('req.params', req.params);

	const user = await User.findById(req.user.userId);

	const subscriptionId = user.subscription.id;

	const generatedSignature = crypto
		.createHmac('sha256', '0gN6WPD3LI5zaOfhkCJTzXG4')
		.update(paymentId + '|' + subscriptionId, 'utf-8')
		.digest('hex');

	console.log('generateSignature', generatedSignature);

	const isAuthenticSignature = generatedSignature === razorpay_signature;
	console.log('isAuthenicSignature', isAuthenticSignature);
	if (!isAuthenticSignature) {
		throw new BadRequestError('Payment not verified, try again after sometime');
	}

	await Payment.create({
		razorpay_signature: razorpay_signature,
		razorpay_payment_id: paymentId,
		razorpay_subscription_id: subscription_id,
	});

	user.subscription.status = 'active';

	await user.save();

	res.redirect(LOGIN_REDIRECT);
};
