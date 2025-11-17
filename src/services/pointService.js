import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const pointService = {
  getBalance: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.POINTS.BALANCE);
    return response.data;
  },

  getTransactions: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.POINTS.TRANSACTIONS);
    return response.data;
  },
};

