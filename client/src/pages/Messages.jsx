import React, { useState, useRef, useEffect } from 'react';
import {
	FaSearch,
	FaPhone,
	FaVideo,
	FaEllipsisV,
	FaSmile,
	FaPaperPlane,
	FaChevronLeft,
	FaChevronRight,
} from 'react-icons/fa';
import { useDashboardContext } from './DashboardLayout';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import io from 'socket.io-client';

export const loader = async () => {
	try {
		const { data } = await customFetch.get(`/conversation`);
		const { conversation } = data;
		return { conversation };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

export default function Messages() {
	const { user } = useDashboardContext();
	const { conversation } = useLoaderData();

	const [refresh, setRefresh] = useState(false);
	const [selectedContact, setSelectedContact] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const messagesEndRef = useRef(null);
	const socket = useRef();
	const socketInitialized = useRef(false);

	useEffect(() => {
		if (!socketInitialized.current) {
			socket.current = io('ws://localhost:8900');
			socketInitialized.current = true;
			socket.current.on('getMessage', (data) => {
				setArrivalMessage({
					sender: data.senderId,
					text: data.text,
					createdAt: Date.now(),
				});
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage &&
			selectedContact?.friendId?._id.includes(arrivalMessage?.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, selectedContact]);

	useEffect(() => {
		socket.current.emit('addUser', user?._id);
		socket.current.on('getUsers', (users) => {
			setOnlineUsers(users);
		});
	}, [user]);

	useEffect(() => {
		const getMessagesForConversation = async () => {
			try {
				const { data } = await customFetch.get(
					`/message/${selectedContact.conversationId}`
				);
				const { messages } = data;
				setMessages(messages);
			} catch (error) {
				toast.error(error?.response?.data?.msg);
			}
		};
		getMessagesForConversation();
	}, [selectedContact, refresh]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom, [messages]);

	const handleSendMessage = async () => {
		socket.current.emit('sendMessage', {
			senderId: user._id,
			receiverId: selectedContact?.friendId?._id,
			text: newMessage,
		});
		try {
			await customFetch.post('/message', {
				conversationId: selectedContact.conversationId,
				sender: user._id,
				text: newMessage,
			});
			setNewMessage('');
			setRefresh((prev) => !prev);
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		}
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className='flex h-full bg-lightMainBg dark:bg-darkMainBg'>
			{/* Contacts Sidebar */}
			<div
				className={`${
					isSidebarOpen ? 'w-full sm:w-80' : 'w-0'
				} bg-lightCardBg dark:bg-darkCardBg border-r border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 ease-in-out`}
			>
				{isSidebarOpen && (
					<>
						<div className='p-4'>
							<h2 className='text-2xl font-bold mb-4 text-lightTextIcons1 dark:text-darkTextIcons1'>
								Chats
							</h2>
							<div className='relative mb-4'>
								<FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-lightTextIcons2 dark:text-darkTextIcons2' />
								<input
									type='text'
									placeholder='Search contacts...'
									className='w-full pl-10 pr-4 py-2 bg-lightMainBg dark:bg-darkMainBg border-none rounded-full text-lightTextIcons1 dark:text-darkTextIcons1 focus:outline-none focus:ring-2 focus:ring-primaryBrandColor'
								/>
							</div>
						</div>
						<div className='flex-1 overflow-y-auto'>
							{conversation.map((singleConversation) => {
								const friendId = singleConversation.members.find(
									(m) => m._id !== user._id
								);

								return (
									<div
										key={singleConversation._id}
										className={`flex items-center p-4 cursor-pointer hover:bg-lightMainBg dark:hover:bg-darkMainBg transition-colors ${
											selectedContact?.friendId._id === friendId._id
												? 'bg-primaryBrandColor dark:bg-primaryBrandColor text-darkTextIcons1'
												: 'text-lightTextIcons1 dark:text-darkTextIcons1'
										}`}
										onClick={() => {
											setSelectedContact({
												friendId,
												conversationId: singleConversation._id,
											});
											setIsSidebarOpen(!isSidebarOpen);
										}}
									>
										<div className='relative'>
											<img
												src='https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid'
												alt=''
												className='w-12 h-12 rounded-full mr-4'
											/>
											{onlineUsers.some(
												(user) => user.userId === friendId._id
											) && (
												<div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-lightMainBg dark:border-darkMainBg'></div>
											)}
										</div>
										<div className='flex-1'>
											<div className='flex justify-between items-baseline'>
												<h3 className='font-semibold'>{friendId.name}</h3>
												<span className='text-xs text-lightTextIcons2 dark:text-darkTextIcons2'>
													{singleConversation.lastMessageTime}
												</span>
											</div>
											<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2 truncate'>
												{singleConversation.lastMessage}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>

			{/* Toggle Sidebar Button */}
			<button
				onClick={toggleSidebar}
				className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-lightMainBg dark:bg-darkMainBg p-2 rounded-r-md shadow-md z-10'
			>
				{isSidebarOpen ? (
					<FaChevronLeft className='text-lightTextIcons2 dark:text-darkTextIcons2' />
				) : (
					<FaChevronRight className='text-lightTextIcons2 dark:text-darkTextIcons2' />
				)}
			</button>

			{/* Chat Area */}
			<div className='flex-1 flex flex-col overflow-hidden'>
				{selectedContact ? (
					<>
						{/* Chat Header */}
						<div className='bg-lightCardBg dark:bg-darkCardBg border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between'>
							<div className='flex items-center'>
								<img
									src={selectedContact?.avatar}
									alt={selectedContact?.friendId?.name}
									className='w-10 h-10 rounded-full mr-4'
								/>
								<div>
									<h2 className='font-semibold text-lightTextIcons1 dark:text-darkTextIcons1'>
										{selectedContact?.friendId?.name}
									</h2>
									<p className='text-sm text-lightTextIcons2 dark:text-darkTextIcons2'>
										{onlineUsers.some(
											(user) => user.userId === selectedContact?.friendId?._id
										)
											? 'Online'
											: 'Offline'}
									</p>
								</div>
							</div>
							<div className='flex space-x-2'>
								<button className='p-2 rounded-full hover:bg-lightMainBg dark:hover:bg-darkMainBg transition-colors'>
									<FaPhone className='h-5 w-5 text-lightTextIcons2 dark:text-darkTextIcons2' />
								</button>
								<button className='p-2 rounded-full hover:bg-lightMainBg dark:hover:bg-darkMainBg transition-colors'>
									<FaVideo className='h-5 w-5 text-lightTextIcons2 dark:text-darkTextIcons2' />
								</button>
								<button className='p-2 rounded-full hover:bg-lightMainBg dark:hover:bg-darkMainBg transition-colors'>
									<FaEllipsisV className='h-5 w-5 text-lightTextIcons2 dark:text-darkTextIcons2' />
								</button>
							</div>
						</div>

						{/* Messages */}
						<div className='flex-1 overflow-y-auto p-4 bg-lightMainBg dark:bg-darkMainBg'>
							{messages.map((message) => (
								<div
									key={message._id}
									className={`flex mb-4 ${
										message.sender === user._id
											? 'justify-end'
											: 'justify-start'
									}`}
								>
									<div
										className={`max-w-[70%] p-3 rounded-lg ${
											message.sender === user._id
												? 'bg-primaryBrandColor text-darkTextIcons2'
												: 'bg-lightCardBg dark:bg-darkCardBg text-lightTextIcons1 dark:text-darkTextIcons1'
										}`}
									>
										<p>{message.text}</p>
										<span className='text-xs opacity-75 mt-1 block'>
											{dayjs(message.createdAt).format('YYYY-MM-DD HH:mm')}
										</span>
									</div>
								</div>
							))}
							<div ref={messagesEndRef} />
						</div>

						{/* Message Input */}
						<div className='bg-lightCardBg dark:bg-darkCardBg border-t border-gray-200 dark:border-gray-700 p-4'>
							<div className='flex items-center space-x-2'>
								<button className='p-2 rounded-full hover:bg-lightMainBg dark:hover:bg-darkMainBg transition-colors'>
									<FaSmile className='h-5 w-5 text-lightTextIcons2 dark:text-darkTextIcons2' />
								</button>
								<input
									type='text'
									name='text'
									id='text'
									value={newMessage}
									onChange={(e) => {
										setNewMessage(e.target.value);
									}}
									placeholder='Type a message...'
									onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
									className='flex-1 p-2 bg-lightMainBg dark:bg-darkMainBg border-none rounded-full text-lightTextIcons1 dark:text-darkTextIcons1 focus:outline-none focus:ring-2 focus:ring-primaryBrandColor'
								/>
								<button
									type='submit'
									onClick={handleSendMessage}
									className='p-2 bg-primaryBrandColor rounded-full hover:bg-green-600 transition-colors'
								>
									<FaPaperPlane className='h-5 w-5 text-white' />
								</button>
							</div>
						</div>
					</>
				) : (
					<div className='flex-1 flex items-center justify-center bg-lightMainBg dark:bg-darkMainBg'>
						<p className='text-xl text-lightTextIcons1 dark:text-darkTextIcons1'>
							Select a contact to start chatting
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
