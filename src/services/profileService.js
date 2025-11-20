import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const profileService = {
  getProfile: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROFILE.SHOW(id));
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.PROFILE.UPDATE, data);
    return response.data;
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosInstance.post(API_ENDPOINTS.PROFILE.AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getSuggestedUsers: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.SUGGESTIONS);
    return response.data;
  },
};

