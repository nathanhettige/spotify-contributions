import { PageLoading } from '@ui/utils/PageLoading';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import useAuth from './api/SpotifyAuth/useSpotifyAuth';

/* Code split theme page */
const ThemePage = lazy(async () => await import('./pages/ThemePage'));

const Router = () => {
  const { accessToken } = useAuth();

  const router = createBrowserRouter(
    accessToken === null
      ? [
          {
            path: '/',
            element: <LoginPage />
          },
          {
            path: '/theme',
            element: (
              <Suspense fallback={<PageLoading />}>
                <ThemePage />
              </Suspense>
            )
          }
        ]
      : [
          {
            path: '/',
            element: <ProfilePage />
          }
        ],
    { basename: `${import.meta.env.BASE_URL}` }
  );

  return <RouterProvider router={router} />;
};

export default Router;
