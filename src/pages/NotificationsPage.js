import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Уведомления</h1>
        </div>

        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            У вас пока нет уведомлений
          </h2>
          
          <p className="text-gray-600 mb-8">
            Здесь будут появляться уведомления о лайках, комментариях и новых подписчиках
          </p>

          <div className="inline-flex items-center space-x-2 text-primary-600 mb-8">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-medium">Функция в разработке...</span>
          </div>

          <Link to="/feed" className="btn-secondary inline-block">
            Вернуться в ленту
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;

