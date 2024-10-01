import { isAxiosError } from 'axios';
import api from '../config/axios';
import {
  branchesSchema,
  CreditRequestForm,
  creditResponseSchema,
  creditsStatusCountSchema,
} from '../types';

export const creditRequest = async (creditRequestForm: CreditRequestForm) => {
  try {
    const { data } = await api.post('/credits/', creditRequestForm);
    const result = creditResponseSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getCreditStatusCount = async () => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api('/credits/status-count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = creditsStatusCountSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getBranches = async () => {
  try {
    const { data } = await api('/branches/');
    const result = branchesSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
