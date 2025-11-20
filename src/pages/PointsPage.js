import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import { useAuth } from '../context/AuthContext';

function PointsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full mb-6">
            <span className="text-4xl font-bold text-primary-600">{user?.points || 0}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Система поинтов
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            У вас <span className="font-bold text-primary-600">{user?.points || 0}</span> поинтов
          </p>

          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Как заработать поинты:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Создание поста</span>
                <span className="font-bold text-green-600">+10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Получение лайка</span>
                <span className="font-bold text-green-600">+2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Написание комментария</span>
                <span className="font-bold text-green-600">+5</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 text-primary-600 mb-8">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-medium">История транзакций в разработке...</span>
          </div>

          <Link to="/feed" className="btn-primary inline-block">
            Вернуться в ленту
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PointsPage;

