import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5 '>
          <Outlet />
        </div>
      </main>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default AppLayout;
