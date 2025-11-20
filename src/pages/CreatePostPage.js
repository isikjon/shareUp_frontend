import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Создание постов
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Эта функция находится в разработке и скоро будет доступна!
          </p>

          <div className="inline-flex items-center space-x-2 text-primary-600 mb-8">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-medium">В процессе разработки...</span>
          </div>

          <Link to="/feed" className="btn-primary inline-block">
            Вернуться в ленту
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;

