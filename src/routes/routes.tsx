import { Navigate, useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const allRoutes = () => {
  const { isAuthenticated } = useAuth();

  const publicRoutes = [
    {
      path: '/',
      exact: true,
      element: !isAuthenticated ? <>Home</> : <Navigate to="/profile" />
    }
  ];

  const privateRoutes = [
    {
      path: '/profile',
      exact: true,
      element: isAuthenticated ? <>TEste</> : <Navigate to="/" />
    }
  ];

  return [...publicRoutes, ...privateRoutes];
};

export default function Routes() {
  const appRoutes = allRoutes();
  return useRoutes(appRoutes);
}
