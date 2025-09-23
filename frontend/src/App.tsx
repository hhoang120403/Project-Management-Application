import { Route, Routes } from 'react-router';
import Home from './pages/root/Home';
import AuthLayout from './pages/auth/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import DashBoardLayout from './pages/dashboard/DashBoardLayout';
import DashBoard from './pages/dashboard/DashBoard';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Route>
      <Route path='/dashboard' element={<DashBoardLayout />}>
        <Route index element={<DashBoard />} />
      </Route>
    </Routes>
  );
};
export default App;
