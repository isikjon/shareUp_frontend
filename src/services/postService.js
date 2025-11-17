import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const postService = {
  getFeed: async (page = 1) => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.LIST, {
      params: { page },
    });
    return response.data;
  },

  getPost: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.SHOW(id));
    return response.data;
  },

  createPost: async (formData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.POSTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deletePost: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.POSTS.DELETE(id));
    return response.data;
  },

  getUserPosts: async (userId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.USER_POSTS(userId));
    return response.data;
  },
};

