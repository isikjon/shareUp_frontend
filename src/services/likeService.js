import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const likeService = {
  toggleLike: async (postId) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LIKES.TOGGLE(postId));
    return response.data;
  },
};

