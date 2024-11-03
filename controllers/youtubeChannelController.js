import * as dotenv from 'dotenv';
dotenv.config();
import YoutubeChannel from '../models/youtubeChannelModel.js';
import { StatusCodes } from 'http-status-codes';
import { google } from 'googleapis';
import {
	calculateOverallFrequency,
	extractTitlesForCategory,
} from '../utils/youtubeUtils.js';
import { BadRequestError } from '../errors/customErrors.js';

const oauth2Client = new google.auth.OAuth2(
	process.env.YT_CLIENT_ID,
	process.env.YT_CLIENT_SECRET,
	process.env.YT_REDIRECT_URI
);

const scopes =
	'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile';

export const getAllYoutubeChannels = async (req, res) => {
	const youtubeChannels = await YoutubeChannel.find({
		ownedBy: req.user.userId,
	});
	res.status(StatusCodes.OK).json({ youtubeChannels });
};

export const getYoutubeChannelForSearch = async (req, res) => {
	const youtubeChannels = await YoutubeChannel.find({});
	res.status(StatusCodes.OK).json({ youtubeChannels });
};

export const getYoutubeChannel = async (req, res) => {
	const { id } = req.params;
	const youtubeChannel = await YoutubeChannel.findById(id);

	res.status(StatusCodes.OK).json({ youtubeChannel });
};

export const deleteYoutubeChannel = async (req, res) => {
	const { id } = req.params;
	await YoutubeChannel.findByIdAndDelete(id);
	res
		.status(StatusCodes.OK)
		.json({ msg: 'Youtube Channels Data has been deleted' });
};

export const authorizeYoutubeChannel = async (req, res) => {
	const url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		prompt: 'select_account',
	});

	res.status(StatusCodes.OK).json({ url });
};

export const authorizeYoutubeCallback = async (req, res) => {
	try {
		const { code } = req.query;

		// Validate if the code is present
		if (!code) {
			throw new BadRequestError('Authorization code is missing');
		}

		// Exchange authorization code for tokens
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);

		const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

		// Get YouTube channel data
		const channelDataResponse = await youtube.channels.list({
			part: 'snippet,statistics,topicDetails',
			mine: true,
		});

		const channelData = channelDataResponse.data.items[0];

		// If no channel data, return not found
		if (!channelData) {
			throw new BadRequestError('No YouTube channel found');
		}

		const channelDataExist = await YoutubeChannel.findOne({
			channelId: channelData.id,
		});

		if (channelDataExist) {
			throw new BadRequestError('Channel Data already exists');
		}

		// Extract channel information
		const channelLogo = channelData.snippet.thumbnails.medium.url;
		const channelId = channelData.id;
		const name = channelData.snippet.title;
		const category = extractTitlesForCategory(
			channelData.topicDetails?.topicCategories || []
		);
		const subscribers = channelData.statistics.subscriberCount;
		const avgViews = channelData.statistics.viewCount;

		// Get videos from the channel
		const channelVideosResponse = await youtube.search.list({
			part: 'snippet',
			channelId: channelData.id,
			maxResults: 50, // Limit results for performance reasons
		});

		const videos = channelVideosResponse.data.items.filter(
			(item) => item.id.kind === 'youtube#video'
		);

		let videoData = [];
		let uploadFrequency = 0;

		if (videos.length > 0) {
			// Calculate upload frequency
			uploadFrequency = calculateOverallFrequency(videos);

			// Get statistics for the videos
			const videoIds = videos.map((item) => item.id.videoId).join(',');
			const videoStatisticsResponse = await youtube.videos.list({
				part: 'statistics, topicDetails, snippet',
				id: videoIds,
				maxResults: 50,
			});

			const videoStatistics = videoStatisticsResponse.data.items;

			videoStatistics.forEach((video) => {
				const title = video?.snippet?.title;
				const thumbnail = video?.snippet?.thumbnails?.medium?.url;
				const category = extractTitlesForCategory(
					video?.topicDetails?.topicCategories
				);
				const viewCount = video?.statistics?.viewCount;
				const likeCount = video?.statistics?.likeCount;
				const commentCount = video?.statistics?.commentCount;
				const uploadDate = video?.snippet?.publishedAt;

				videoData.push({
					title,
					thumbnail,
					category,
					viewCount,
					likeCount,
					commentCount,
					uploadDate,
				});
			});
		}

		// Save the YouTube channel data in the database
		await YoutubeChannel.create({
			channelLogo,
			channelId,
			name,
			category,
			subscribers,
			avgViews,
			uploadFrequency,
			ownedBy: req.user.userId,
			videoData,
		});

		// Return the response with channel info, videos, and their statistics
		return res.redirect(process.env.LOGIN_REDIRECT);
	} catch (error) {
		console.error(error);
		return res.redirect(process.env.LOGIN_REDIRECT); // Ensure only one response is sent
	}
};
