import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const adminService = {
  getDashboard: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.DASHBOARD);
    return response.data;
  },

  getUsers: async (page = 1) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS, {
      params: { page },
    });
    return response.data;
  },

  banUser: async (userId) => {
    const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.BAN_USER(userId));
    return response.data;
  },

  unbanUser: async (userId) => {
    const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.UNBAN_USER(userId));
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.ADMIN.DELETE_USER(userId));
    return response.data;
  },

  addPoints: async (userId, amount, description) => {
    const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.ADD_POINTS(userId), {
      amount,
      description,
    });
    return response.data;
  },

  deductPoints: async (userId, amount, description) => {
    const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.DEDUCT_POINTS(userId), {
      amount,
      description,
    });
    return response.data;
  },

  getPosts: async (page = 1) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.POSTS, {
      params: { page },
    });
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.ADMIN.DELETE_POST(postId));
    return response.data;
  },

  getLogs: async (page = 1) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.LOGS, {
      params: { page },
    });
    return response.data;
  },
};

