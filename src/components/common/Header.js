import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/helpers';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const avatarUrl = user?.avatar ? getImageUrl(user.avatar) : null;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/feed" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">ShareUp</h1>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/feed"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Лента
            </Link>
            <Link
              to="/points"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Поинты
            </Link>
            
            <div className="relative group">
              <button className="flex items-center space-x-3 hover:opacity-80 transition">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-200">
                    <span className="text-primary-600 font-bold text-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="font-medium text-gray-700 hidden sm:block">
                  {user?.name}
                </span>
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Link
                  to="/profile/me"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-t-lg transition"
                >
                  Мой профиль
                </Link>
                {user?.is_admin && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Админ-панель
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-lg transition"
                >
                  Выйти
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

