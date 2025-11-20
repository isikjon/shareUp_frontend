import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import { useAuth } from '../context/AuthContext';

function PointsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-12">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-6 shadow-lg">
              <span className="text-4xl font-bold text-blue-600">{user?.points || 0}</span>
            </div>
            
            <h1 className="text-3xl font-bold gradient-text mb-4">
              Система поинтов
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              У вас <span className="font-bold text-blue-600">{user?.points || 0}</span> поинтов
            </p>

            <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-8 shadow-md">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Как заработать поинты:</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-gray-700 font-medium">Создание поста</span>
                  <span className="font-bold text-green-600 text-lg">+10</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-gray-700 font-medium">Получение лайка</span>
                  <span className="font-bold text-green-600 text-lg">+2</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-gray-700 font-medium">Написание комментария</span>
                  <span className="font-bold text-green-600 text-lg">+5</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 text-blue-600 mb-8">
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="font-semibold">История транзакций в разработке...</span>
            </div>

            <Link to="/feed" className="btn-primary">
              Вернуться в ленту
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointsPage;
