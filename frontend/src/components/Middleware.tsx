import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import Loading from './Loading';

const Middleware = () => {
  const location = useLocation();
  const path = location.pathname;

  const authenticationPages = ['/login', '/register'];

  const isHomePage = path === '/';
  const isLoginOrRegisterPage = authenticationPages.includes(path);
  const isAssignTaskPage = path === '/assign-task';
  const isViewTasksPage = path === '/view-tasks';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{
    email: string;
    id: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-auth');
        const isAuth = response.status !== 401;

        if (isAuth) {
          const { email, userId: id, role } = response.data.user;
          setUser({ email, id, role });
        }

        setIsAuthenticated(isAuth);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <Loading fullScreen text="Checking authentication…" />;
  }

  if (isAuthenticated) {
    if (isLoginOrRegisterPage) {
      return <Navigate to="/" replace />;
    }

    if (isAssignTaskPage && user?.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    if (isViewTasksPage && user?.role !== 'user') {
      return <Navigate to="/" replace />;
    }

    if (isHomePage) {
      if (user?.role === 'admin') {
        return <Navigate to="/assign-task" replace />;
      }
      if (user?.role === 'user') {
        return <Navigate to="/view-tasks" replace />;
      }
    }
  }

  if (!isAuthenticated && !isLoginOrRegisterPage) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user }} />;
};

export default Middleware;
