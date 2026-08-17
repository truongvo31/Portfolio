import { createElement, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminAuthGuard from './components/guards/adminAuthGuard';
import SessionGuard from './components/guards/sessionGuard';

const DefaultLayout = lazy(() => import('./layouts/default'));
const ErrorPage = lazy(() => import('./pages/error'));
const HomePage = lazy(() => import('./pages/home'));
const SettingsPage = lazy(() => import('./pages/settings'));
const AdminLayout = lazy(() => import('./layouts/admin'));
const AdminPage = lazy(() => import('./pages/admin'));
const AdminSessionPage = lazy(() => import('./pages/admin/sessions'));

const routes = createBrowserRouter(
  [
    // Client routes
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
    // Admin routes
    {
      path: '/admin',
      element: createElement(AdminAuthGuard, null, createElement(AdminLayout)),
      children: [
        {
          path: '/admin',
          element: createElement(AdminPage),
        },
        {
          path: '/admin/sessions',
          element: createElement(AdminSessionPage),
        },
        {
          path: '/admin/settings',
          element: createElement(SettingsPage),
        },
      ],
    },
    // Error route
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
