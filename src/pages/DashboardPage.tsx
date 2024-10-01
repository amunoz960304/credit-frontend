import { useEffect } from 'react';
import CreditStatusGraphic from '../components/CreditStatusGraphic';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  });

  return (
    <>
      <CreditStatusGraphic />
    </>
  );
};

export default DashboardPage;
