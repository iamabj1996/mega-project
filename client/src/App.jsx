import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Landing,
	Login,
	Register,
	HomeLayout,
	Error,
	DashboardLayout,
	SocialMedia,
	Revenue,
	Messages,
	AllCreatorsMain,
	SingleYtChannel,
	AllCreatorsLayout,
	BrandProfile,
	BrandProfileLayout,
	BrandProfileEdit,
	ContractForm,
	ContractLayout,
	AllContract,
	SingleContract,
	CampaignCreation,
	UgContentCreatorBoard,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as socialMediaAction } from './pages/SocialMedia';
import { action as brandProfileEditAction } from './pages/BrandProfileEdit';
import { action as createContractAction } from './pages/ContractForm';

import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as socialMediaLoader } from './pages/SocialMedia';
import { loader as allCreatorsLoader } from './pages/AllCreatorsLayout';
import { loader as singleYtChannelLoader } from './pages/SingleYtChannel';
import { loader as messageLoader } from './pages/Messages';
import { loader as allContractsLoader } from './pages/ContractLayout';
import { loader as singleContractLoader } from './pages/SingleContract';
import { loader as brandProfileLayoutLoader } from './pages/BrandProfileLayout';
import InstagramCreatorInfo from './pages/InstagramCreatorInfo';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: 'login',
				element: <Login />,
				action: loginAction,
			},

			{
				path: 'register',
				element: <Register />,
				action: registerAction,
			},

			{
				path: 'dashboard',
				element: <DashboardLayout />,
				loader: dashboardLoader,
				children: [
					{
						index: true,
						element: <SocialMedia />,
						action: socialMediaAction,
						loader: socialMediaLoader,
					},

					{
						path: 'messages',
						element: <Messages />,
						loader: messageLoader,
					},

					{
						path: 'revenue',
						element: <Revenue />,
					},

					{
						path: 'search-creators',
						element: <AllCreatorsLayout />,
						loader: allCreatorsLoader,
						children: [
							{
								index: true,
								element: <AllCreatorsMain />,
							},
							{
								path: ':id',
								element: <SingleYtChannel />,
								loader: singleYtChannelLoader,
							},
						],
					},

					{
						path: 'contract',
						element: <ContractLayout />,
						loader: allContractsLoader,
						children: [
							{
								index: true,
								element: <AllContract />,
							},
							{
								path: 'new-contract',
								element: <ContractForm />,
								action: createContractAction,
							},
							{
								path: ':id',
								element: <SingleContract />,
								loader: singleContractLoader,
							},
							{
								path: 'new-campaign',
								element: <CampaignCreation />,
							},
							{
								path: 'ugc-board',
								element: <UgContentCreatorBoard />,
							},
						],
					},

					{
						path: 'brand-profile',
						element: <BrandProfileLayout />,
						loader: brandProfileLayoutLoader,
						children: [
							{
								index: true,
								element: <BrandProfile />,
							},
							{
								path: 'edit/:id',
								element: <BrandProfileEdit />,
								action: brandProfileEditAction,
							},
						],
					},
					{
						path: 'instagram',
						element: <InstagramCreatorInfo />,
					},
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
