import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../config/api';

export const notificationService = {
  getNotifications: async (page = 1) => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATION.ALL, {
      params: { page },
    });
    return response.data;
  },

  getUnread: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATION.UNREAD);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATION.UNREAD_COUNT);
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await axiosInstance.post(API_ENDPOINTS.NOTIFICATION.MARK_READ(notificationId));
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.NOTIFICATION.MARK_ALL_READ);
    return response.data;
  },
};

