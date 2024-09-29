import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Home from "@/pages/home.tsx";
import {LoginForm} from "@/pages/login.tsx";
import NotFound from "@/pages/not-found.tsx";
import {SignupForm} from "@/pages/signup.tsx";
import SimuladoPage from '@/pages/simulado';

const allRoutes = () => {
  const { isAuthenticated } = useAuth();

  const publicRoutes = [
    {
      path: '/',
      exact: true,
      element: !isAuthenticated ? <Home /> : <Navigate to="/simulado" />,
    },
    {
      path: '/login',
      exact: true,
      element: !isAuthenticated ? <LoginForm /> : <Navigate to="/simulado" />,
    },
    {
      path: '/signup',
      exact: true,
      element: !isAuthenticated ? <SignupForm/> : <Navigate to={'/simulado'}/>,

    }
  ];

  const privateRoutes = [
    {
      path: '/simulado',
      exact: true,
      element: isAuthenticated ? <SimuladoPage/> : <Navigate to="/login" />,
    },
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
