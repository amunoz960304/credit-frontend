import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <header className='bg-gray-800 py-5'>
      <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <nav className='w-full flex justify-between mx-10 py-5'>
          <div className='flex gap-10'>
            <Link to={'/'} className='text-white'>
              Inicio
            </Link>
            <Link to={'/dashboard'} className='text-white'>
              Dashboard
            </Link>
          </div>
          {isLoggedIn && (
            <div>
              <button
                className='text-white'
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
