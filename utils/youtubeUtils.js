export function extractTitlesForCategory(urls) {
	return urls.map((url) => {
		// Extract the part after "/wiki/"
		const title = url.split('/wiki/')[1];

		// Replace underscores with spaces
		return title.replace(/_/g, ' ');
	});
}

export function calculateOverallFrequency(videos) {
	if (videos.length < 2) {
		return 'Not enough data to determine frequency';
	}

	// Sort videos by publish time in ascending order
	const sortedVideos = videos.sort(
		(a, b) => new Date(a.snippet.publishTime) - new Date(b.snippet.publishTime)
	);

	// Calculate the time differences between consecutive videos (in days)
	const timeDifferences = [];
	for (let i = 1; i < sortedVideos.length; i++) {
		const publishTime1 = new Date(sortedVideos[i - 1].snippet.publishTime);
		const publishTime2 = new Date(sortedVideos[i].snippet.publishTime);

		const diffInMs = publishTime2 - publishTime1; // Difference in milliseconds
		const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // Convert to days
		timeDifferences.push(diffInDays);
	}

	// Calculate the average time difference between uploads
	const averageDiffInDays =
		timeDifferences.reduce((acc, diff) => acc + diff, 0) /
		timeDifferences.length;

	// Determine frequency based on average difference in days
	let frequency = '';

	if (averageDiffInDays < 1) {
		frequency = 'Multiple times a day';
	} else if (averageDiffInDays <= 2) {
		frequency = 'Daily';
	} else if (averageDiffInDays <= 7) {
		frequency = 'Weekly';
	} else if (averageDiffInDays <= 30) {
		frequency = 'Monthly';
	} else if (averageDiffInDays <= 182) {
		frequency = 'Every 6 months';
	} else if (averageDiffInDays <= 365) {
		frequency = 'Yearly';
	} else {
		frequency = 'Less than once a year';
	}

	return frequency;
}
