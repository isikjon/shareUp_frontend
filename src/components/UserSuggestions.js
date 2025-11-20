import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profileService } from '../services';
import { getImageUrl } from '../utils/helpers';

function UserSuggestions() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await profileService.getSuggestedUsers();
      setUsers(response.data || []);
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Возможно знакомы</h3>
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="card p-6 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4">Возможно знакомы</h3>
      <div className="space-y-4">
        {users.map((user) => {
          const avatarUrl = user.avatar ? getImageUrl(user.avatar) : null;
          
          return (
            <Link
              key={user.id}
              to={`/profile/${user.id}`}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition group"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-primary-300 transition"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center border-2 border-gray-200 group-hover:border-primary-300 transition">
                  <span className="text-primary-600 font-bold text-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate group-hover:text-primary-600 transition">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  @{user.email?.split('@')[0]}
                </p>
              </div>
              
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default UserSuggestions;

