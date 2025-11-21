import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const commentService = {
  getComments: async (postId, page = 1) => {
    const response = await axiosInstance.get(API_ENDPOINTS.COMMENT.POST(postId), {
      params: { page },
    });
    return response.data;
  },

  createComment: async (postId, content) => {
    const response = await axiosInstance.post(API_ENDPOINTS.COMMENT.POST(postId), {
      content,
    });
    return response.data;
  },

  deleteComment: async (commentId) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.COMMENT.DELETE(commentId));
    return response.data;
  },
};
