import type { User } from '@/types';
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { queryClient } from './ReactQueryProvider';
import { useLocation, useNavigate } from 'react-router';
import { publicRoutes } from '@/lib/public-routes';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          navigate('/sign-in');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, isPublicRoute]);

  useEffect(() => {
    const handleLogout = () => {
      logout();
      navigate('/sign-in');
    };
    window.addEventListener('force-logout', handleLogout);
    return () => window.removeEventListener('force-lgout', handleLogout);
  }, [navigate]);

  const login = async (data: any) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const values = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth muse be used within an AuthProvider');
  }
  return context;
};
