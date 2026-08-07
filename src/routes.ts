import { createElement, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import SessionGuard from './components/sessionGuard';
const DefaultLayout = lazy(() => import('./layouts/default'));
const ErrorPage = lazy(() => import('./pages/error'));
const HomePage = lazy(() => import('./pages/home'));
const SettingsPage = lazy(() => import('./pages/settings'));
const AdminLayout = lazy(() => import('./layouts/admin'));
const AdminPage = lazy(() => import('./pages/admin'));

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: createElement(
        SessionGuard,
        {
          fallback: createElement(ErrorPage, {
            code: 401,
            message: 'Session is invalid or missing.',
            showHomeButton: false,
          }),
        },
        createElement(DefaultLayout),
      ),
      children: [
        {
          path: '/',
          element: createElement(HomePage),
        },
        {
          path: '/settings',
          element: createElement(SettingsPage),
        },
      ],
    },
    {
      path: '/admin',
      element: createElement(AdminLayout),
      children: [
        {
          path: '/admin',
          element: createElement(AdminPage),
        },
      ],
    },
    {
      path: '*',
      element: createElement(ErrorPage, { code: 404, message: 'Page Not Found' }),
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default routes;
