import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import CreditRequestPage from './pages/CreditRequestPage';
import DashboardPage from './pages/DashboardPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={'/'} element={<CreditRequestPage />} index />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
