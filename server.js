import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//Routers
import youtubeChannelRouter from './routes/youtubeChannelRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import conversationRouter from './routes/conversationRouter.js';
import messageRouter from './routes/messageRouter.js';
import contractRouter from './routes/contractRouter.js';
import brandProfileRouter from './routes/brandProfileRouter.js';
import instagramRouter from './routes/instagramRouter.js';

//Middlwares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { validateTest } from './middleware/validationMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './public')));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/api/v1/test', (req, res) => {
	res.json({ msg: 'Test Api' });
});

app.post('/api/v1/test', validateTest, (req, res) => {
	const { name } = req.body;
	res.json({
		message: `hello ${name}`,
	});
});

app.use('/api/v1/youtube_channels', authenticateUser, youtubeChannelRouter);
app.use('/api/v1/instagram', authenticateUser, instagramRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/conversation', authenticateUser, conversationRouter);
app.use('/api/v1/message', authenticateUser, messageRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/contract', authenticateUser, contractRouter);
app.use('/api/v1/brand_profile', brandProfileRouter);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});
//NOT FOUND MIDDLEWARE => Triggered when request for resource does not exist
app.use('*', (req, res) => {
	res.status(404).json({ msg: 'Not found' });
});

//ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
	await mongoose.connect(process.env.MONGO_URL);
	app.listen(port, () => {
		console.log(`Server running on PORT ${port} ...`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
