import * as dotenv from 'dotenv';
dotenv.config();
import { StatusCodes } from 'http-status-codes';
import InstagramCreator from '../models/instagramCreatorModel.js';
import axios from 'axios';
import { GetPageInfoRequest } from 'instagram-graph-api';
import { BadRequestError } from '../errors/customErrors.js';

export const authorizeInstagram = async (req, res) => {
	const state = '{st=state123abc,ds=123456789}';
	const facebookOAuthUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.REDIRECT_URI_INSTA}&state=${state}&response_type=code&scope=email,public_profile,instagram_basic,instagram_manage_insights`;

	res.status(StatusCodes.OK).json({ url: facebookOAuthUrl });
};

export const authorizeInstagramCallback = async (req, res) => {
	const { code, state } = req.query;

	if (!code) {
		return res.status(400).send('Authorization code not provided.');
	}

	// Exchange the code for an access token
	const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token`;
	const tokenParams = {
		client_id: process.env.FACEBOOK_APP_ID,
		redirect_uri: process.env.REDIRECT_URI_INSTA,
		client_secret: process.env.FACEBOOK_APP_SECRET,
		code,
	};

	const tokenResponse = await axios.get(tokenUrl, { params: tokenParams });
	const accessToken = tokenResponse.data.access_token;

	console.log('accessToken', accessToken);

	// Optionally, fetch user info with the access token
	const userUrl =
		'https://graph.facebook.com/me/accounts?fields=instagram_business_account,id,access_token';
	const userParams = {
		access_token: accessToken,
	};

	const userResponse = await axios.get(userUrl, { params: userParams });
	const userInfo = userResponse.data;

	console.log('userId', userInfo?.data[0]?.id);
	console.log('pageToken', userInfo?.data[0]?.access_token);
	console.log('instagramId', userInfo?.data[0]?.instagram_business_account?.id);

	const instagramDataExist = await InstagramCreator.findOne({
		instagramId: userInfo?.data[0]?.instagram_business_account?.id,
	});

	if (instagramDataExist) {
		return res.redirect(process.env.LOGIN_REDIRECT);
		// throw new BadRequestError('Instagram Data already exists');
	}

	const request = new GetPageInfoRequest(
		accessToken,
		userInfo.data[0]?.instagram_business_account?.id
	);

	const response = await request.execute();

	const creatorName = response.getName();
	const creatorUserName = response.getUsername();
	const profilePicture = response.getProfilePictureUrl();
	const followerCount = response.getFollowers();
	const followingCount = response.getFollows();
	const mediaCount = response.getMediaCount();

	// Fetch Instagram insights
	const insightsUrl = `https://graph.facebook.com/v21.0/${userInfo.data[0]?.instagram_business_account?.id}/insights`;
	const insightsParams = {
		metric:
			'reach,total_interactions,accounts_engaged,likes,comments,shares,saves,replies,profile_links_taps',
		metric_type: 'total_value',
		period: 'day',
		access_token: accessToken,
	};

	const insightsResponse = await axios.get(insightsUrl, {
		params: insightsParams,
	});
	const insightsData = insightsResponse.data;

	//Fetching demographics data
	const demographicsUrl = `https://graph.facebook.com/v21.0/${userInfo.data[0]?.instagram_business_account?.id}/insights`;
	const demographicsParams = {
		metric:
			'engaged_audience_demographics,reached_audience_demographics,follower_demographics',
		metric_type: 'total_value',
		period: 'lifetime',
		timeframe: 'this_month',
		breakdown: 'age,city,country,gender',
		access_token: accessToken,
	};

	const demographicsResponse = await axios.get(demographicsUrl, {
		params: demographicsParams,
	});
	const demographicsData = demographicsResponse.data;

	const instagramId = userInfo?.data[0]?.instagram_business_account?.id;

	await InstagramCreator.create({
		ownedBy: req?.user?.userId,
		instagramId,
		creatorName,
		creatorUserName,
		profilePicture,
		followerCount,
		followingCount,
		mediaCount,
		insights: insightsData?.data,
	});

	return res.redirect(process.env.LOGIN_REDIRECT);
};

export const getAllInstagramPages = async (req, res) => {
	const instagramPages = await InstagramCreator.find({
		ownedBy: req.user.userId,
	});
	res.status(StatusCodes.OK).json({ instagramPages });
};
