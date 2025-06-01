import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axiosInstance from '../config/axios.config';

const Middleware = () => {
  const location = useLocation();
  const path = location.pathname;

  const authenticationPages = ['/login', '/register'];

  const isLoginOrRegisterPage = authenticationPages.includes(path);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-auth');
        const isAuthenticated = response.status !== 401;

        if (isAuthenticated) {
          setRole(response.data.user.role);
        }

        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && isLoginOrRegisterPage) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated && !isLoginOrRegisterPage) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Middleware;
