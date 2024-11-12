import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Landing,
	Login,
	Register,
	HomeLayout,
	Error,
	DashboardLayout,
	SocialMedia,
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
	PrivacyPolicy,
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
import { loader as contractFormLoader } from './pages/ContractForm';
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
				path: 'privacy-policy',
				element: <PrivacyPolicy />,
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
								path: ':id',
								element: <ContractForm />,
								action: createContractAction,
								loader: contractFormLoader,
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
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
