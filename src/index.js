import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import store from './redux/store';
import './utils/global-api';
import { Provider } from 'react-redux';
import Protected from './components/Protected';
import StudentContext from './context/StudentContext';
import Loading from './components/Loading';
import NotFound from './pages/NotFound';
const RootLayout = lazy(() => import('./layouts/RootLayout'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Teachers = lazy(() => import('./pages/Teachers'));
const Groups = lazy(() => import('./pages/groups/Groups'));
const GroupContent = lazy(() => import('./pages/groups/GroupContent'));
const GroupLessons = lazy(() => import('./pages/groups/GroupLessons'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },

      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'profile',
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },

      {
        path: 'teachers',
        element: (
          <Protected>
            <Teachers />
          </Protected>
        ),
      },

      {
        path: 'groups',

        children: [
          {
            index: true,
            element: (
              <Protected>
                <Groups />
              </Protected>
            ),
          },
          {
            path: ':id/content',
            children: [
              {
                index: true,
                element: (
                  <Protected>
                    <GroupContent />
                  </Protected>
                ),
              },
              {
                path: ':id',
                element: (
                  <Protected>
                    <GroupLessons />
                  </Protected>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <Provider store={store}>
          <StudentContext>
            <RouterProvider router={router} />
          </StudentContext>
        </Provider>
      </HelmetProvider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
