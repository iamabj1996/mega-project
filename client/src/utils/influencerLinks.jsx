import React from 'react';
import { LuShare2, LuMessageSquare, LuDollarSign } from 'react-icons/lu';
import { FaRegHandshake, FaCreativeCommonsBy } from 'react-icons/fa';
import { AiFillProfile } from 'react-icons/ai';

const influencerLinks = [
	{
		icon: <LuShare2 className='h-6 w-6' />,
		label: 'Social Media',
		href: '.',
	},
	{
		icon: <LuMessageSquare className='h-6 w-6' />,
		label: 'Messages',
		href: 'messages',
	},
	{
		icon: <FaRegHandshake className='h-6 w-6' />,
		label: 'Contracts',
		href: 'contract',
	},
	{
		icon: <LuDollarSign className='h-6 w-6' />,
		label: 'Revenue',
		href: 'revenue',
	},
	{
		icon: <FaCreativeCommonsBy className='h-6 w-6' />,
		label: 'Creators',
		href: 'search-creators',
	},
	{
		icon: <AiFillProfile className='h-6 w-6' />,
		label: 'Brand Profile',
		href: 'brand-profile',
	},
];

export default influencerLinks;
