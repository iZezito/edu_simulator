import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Home from "@/pages/home.tsx";
import {LoginForm} from "@/pages/login.tsx";
import NotFound from "@/pages/not-found.tsx";
import {SignupForm} from "@/pages/signup.tsx";
import SimuladoPage from '@/pages/simulado';
import SimuladoView from '@/pages/simulado/edit';
import Sobre from '@/pages/sobre';
import Profile from '@/pages/profile';
import ForgotPasswordForm from '@/pages/forgot-password';
import ResetPasswordForm from '@/pages/reset-password';
import EmailValidation from '@/pages/validate-email';

const allRoutes = () => {
  const { isAuthenticated } = useAuth();

  const publicRoutes = [
    {
      path: '/',
      exact: true,
      element: <Home />,
    },
    {
      path: '/login',
      exact: true,
      element: !isAuthenticated ? <LoginForm /> : <Navigate to="/" />,
    },
    {
      path: '/signup',
      exact: true,
      element: !isAuthenticated ? <SignupForm/> : <Navigate to={'/'}/>,
    },
    {
      path: '/sobre',
      exact: true,
      element: <Sobre/>,
    },
    {
      path: '/forgot-password',
      exact: true,
      element: !isAuthenticated ? <ForgotPasswordForm/> : <Navigate to={'/'}/>,
    },
    {
      path: '/reset-password',
      exact: true,
      element: !isAuthenticated ? <ResetPasswordForm/> : <Navigate to={'/'} />
    },
    {
      path: 'validate-email',
      exact: true,
      element: !isAuthenticated ? <EmailValidation /> : <Navigate to={'/'} />,
    }
  ];

  const privateRoutes = [
    {
      path: '/simulado',
      exact: true,
      element: isAuthenticated ? <SimuladoPage/> : <Navigate to="/login" />,
    },
    {
      path: '/simulado/:id',
      element: isAuthenticated ? <SimuladoView/> : <Navigate to="/login" />,
     },
     {
      path: '/profile',
      exact: true,
      element: isAuthenticated ? <Profile/> : <Navigate to={'/login'} />,
     }
  ];

  const notFoundRoute = [
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return [...publicRoutes, ...privateRoutes, ...notFoundRoute];
};

export default function Routes() {
  const appRoutes = allRoutes();
  return useRoutes(appRoutes);
}
