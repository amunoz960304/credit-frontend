import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { UserLoginForm } from '../types';
import { login } from '../services/auth';
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  });

  const initialValues: UserLoginForm = {
    email: 'muca960403@hotmail.com', 
    password: 'admin123',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <div>
      <h2 className='text-center uppercase text-gray-600 block text-4xl font-bold'>
        Iniciar sesión
      </h2>
      <form
        className='my-10 bg-white shadow rounded-lg p-10'
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='email'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </div>
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='password'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Password de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            {...register('password', {
              required: 'El Password es obligatorio',
            })}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </div>

        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>
    </div>
  );
};

export default LoginPage;
