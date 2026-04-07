import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';

import { AuthLayout } from '../auth/AuthLayout';
import { LoginPage } from '../auth/pages/LoginPage';

import { lazy, Suspense } from 'react';
const DashboardLayout = lazy(() =>
  import('../../modules/dashboard/DashboardLayout').then((m) => ({ default: m.DashboardLayout })),
);
const DashboardPage = lazy(() =>
  import('../../modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);

const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-[#0a0a1a]">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <LoginPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
