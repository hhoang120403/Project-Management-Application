import { useAuth } from '@/provider/authContext';
// import type { RootState } from '@/store/store';
// import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  // const { isAuthenticated, isLoading } = useSelector(
  //   (state: RootState) => state.auth
  // );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to='dashboard' />;
  }

  return <Outlet />;
};
export default AuthLayout;
