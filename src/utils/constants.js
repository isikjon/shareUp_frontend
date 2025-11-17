export const POINT_TYPES = {
  POST: 'post',
  LIKE: 'like',
  COMMENT: 'comment',
  ADMIN_ADD: 'admin_add',
  ADMIN_DEDUCT: 'admin_deduct',
};

export const POINT_AMOUNTS = {
  POST: 10,
  LIKE: 2,
  COMMENT: 5,
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FEED: '/feed',
  PROFILE: '/profile/:id',
  MY_PROFILE: '/profile/me',
  POST: '/post/:id',
  POINTS: '/points',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_POSTS: '/admin/posts',
  ADMIN_LOGS: '/admin/logs',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету',
  UNAUTHORIZED: 'Необходима авторизация',
  FORBIDDEN: 'Доступ запрещён',
  NOT_FOUND: 'Ресурс не найден',
  SERVER_ERROR: 'Ошибка сервера',
};

