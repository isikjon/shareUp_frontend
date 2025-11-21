import React, { useEffect, useState } from 'react';
import { notificationService } from '../services';
import { useNotifications } from '../hooks/useNotifications';
import { getImageUrl } from '../utils/helpers';
import Header from '../components/common/Header';
import { PageTitle } from '../components/common/PageTitle';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { refreshCount } = useNotifications();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data.data || []);
    } catch (err) {
      setError('Ошибка загрузки уведомлений');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      refreshCount();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      refreshCount();
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <PageTitle title="Уведомления" />
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold gradient-text">Уведомления</h1>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Отметить все как прочитанные
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="card p-6 text-center text-red-600">{error}</div>
        ) : notifications.length === 0 ? (
          <div className="card p-12">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 shadow-md">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                У вас пока нет уведомлений
              </h2>
              <p className="text-gray-600">
                Здесь будут появляться уведомления о лайках и комментариях
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                className={`card p-4 cursor-pointer transition ${
                  notification.is_read ? 'bg-white' : 'bg-primary-50 hover:bg-primary-100'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {notification.from_user?.avatar ? (
                    <img
                      src={getImageUrl(notification.from_user.avatar)}
                      alt={notification.from_user.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold text-lg">
                        {notification.from_user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800">
                      <span className="font-semibold">{notification.from_user?.name}</span>{' '}
                      {notification.type === 'like' ? 'понравился ваш пост' : 'прокомментировал ваш пост'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(notification.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
