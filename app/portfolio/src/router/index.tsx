import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { PATHS } from './paths';

const AboutMe = lazy(() => import('../pages/AboutMe/AboutMe'));
const Companies = lazy(() => import('../pages/Companies/Companies'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const RandomStuff = lazy(() => import('../pages/RandomStuff/RandomStuff'));

const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '');

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  [
    {
      path: PATHS.ROOT,
      element: <RootLayout />,
      children: [
        { index: true, element: <Navigate to={PATHS.ABOUT} replace /> },
        { path: PATHS.ABOUT, element: <AboutMe /> },
        { path: PATHS.COMPANIES, element: <Companies /> },
        { path: PATHS.CONTACT, element: <Contact /> },
        { path: PATHS.RANDOM, element: <RandomStuff /> },
      ],
    },
  ],
  routerBasename ? { basename: routerBasename } : undefined,
);
