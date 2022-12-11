import { RouteObject } from 'react-router-dom';

import { MainLayout } from './components/layouts/MainLayout/MainLayout';
import { AuthenticationView } from './views/authentication/AuthenticationView';
import { HomeView } from './views/home/HomeView';

export const routes: RouteObject[] = [
  // TODO: Implement missing routes
  // {
  //   path: '/404',
  //   element: <NotFoundView />,
  // },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
    ],
  },
  {
    path: 'authentication',
    element: <AuthenticationView />,
  }
];