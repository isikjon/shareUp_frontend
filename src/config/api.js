export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  PROFILE: {
    SHOW: (id) => `/profile/${id}`,
    UPDATE: '/profile/update',
    AVATAR: '/profile/avatar',
  },
  USERS: {
    SUGGESTIONS: '/users/suggestions',
  },
  POST: {
    FEED: (page = 1) => `/posts?page=${page}`,
    CREATE: '/posts',
    SHOW: (id) => `/posts/${id}`,
    DELETE: (id) => `/posts/${id}`,
    USER: (userId) => `/posts/user/${userId}`,
    LIKE: (postId) => `/likes/${postId}`,
  },
  COMMENT: {
    POST: (postId) => `/comments/post/${postId}`,
    DELETE: (id) => `/comments/${id}`,
  },
  NOTIFICATION: {
    ALL: '/notifications',
    UNREAD: '/notifications/unread',
    UNREAD_COUNT: '/notifications/unread/count',
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
  POINTS: {
    BALANCE: '/points/balance',
    TRANSACTIONS: '/points/transactions',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    BAN_USER: (userId) => `/admin/users/${userId}/ban`,
    UNBAN_USER: (userId) => `/admin/users/${userId}/unban`,
    DELETE_USER: (userId) => `/admin/users/${userId}`,
    ADD_POINTS: (userId) => `/admin/users/${userId}/points/add`,
    DEDUCT_POINTS: (userId) => `/admin/users/${userId}/points/deduct`,
    POSTS: '/admin/posts',
    DELETE_POST: (postId) => `/admin/posts/${postId}`,
    LOGS: '/admin/logs',
  },
};

