import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const commentService = {
  getComments: async (postId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.COMMENTS.LIST(postId));
    return response.data;
  },

  createComment: async (postId, content) => {
    const response = await axiosInstance.post(API_ENDPOINTS.COMMENTS.CREATE(postId), {
      content,
    });
    return response.data;
  },

  deleteComment: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.COMMENTS.DELETE(id));
    return response.data;
  },
};

