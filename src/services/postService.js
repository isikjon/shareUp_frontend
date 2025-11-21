import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const postService = {
  getFeed: async (page = 1) => {
    const response = await axiosInstance.get(API_ENDPOINTS.POST.FEED(page));
    return response.data;
  },

  createPost: async (formData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.POST.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.POST.DELETE(postId));
    return response.data;
  },

  getUserPosts: async (userId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.POST.USER(userId));
    return response.data;
  },

  toggleLike: async (postId) => {
    const response = await axiosInstance.post(API_ENDPOINTS.POST.LIKE(postId));
    return response.data;
  },
};
