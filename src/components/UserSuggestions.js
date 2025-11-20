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
        <h3 className="font-semibold text-gray-900 mb-4">Возможно вам знакомы</h3>
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
      <h3 className="font-semibold text-gray-900 mb-4">Возможно вам знакомы</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {users.map((user) => {
          const avatarUrl = user.avatar ? getImageUrl(user.avatar) : null;
          
          return (
            <Link
              key={user.id}
              to={`/profile/${user.id}`}
              className="flex flex-col items-center flex-shrink-0 group"
            >
              <div className="relative mb-2">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-primary-200 group-hover:border-primary-400 transition ring-2 ring-white"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center border-3 border-primary-200 group-hover:border-primary-400 transition ring-2 ring-white shadow-md">
                    <span className="text-white font-bold text-xl">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-center max-w-[80px]">
                <p className="text-xs font-medium text-gray-900 truncate group-hover:text-primary-600 transition">
                  {user.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default UserSuggestions;

