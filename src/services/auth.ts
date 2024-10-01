import { isAxiosError } from 'axios';
import api from '../config/axios';
import { UserLoginForm } from '../types';

export const login = async (userLoginForm: UserLoginForm) => {
  try {
    const { data } = await api.post<string>('/auth/login', userLoginForm);
    localStorage.setItem('token', data);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
