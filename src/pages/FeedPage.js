import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services';
import Header from '../components/common/Header';
import PostCard from '../components/PostCard';
import { getImageUrl } from '../utils/helpers';

function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = useCallback(async () => {
    try {
      const response = await postService.getFeed(1);
      setPosts(response.data || []);
    } catch (err) {
      setError('Ошибка загрузки постов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleLikeToggle = (postId, result) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: result.liked, likes_count: result.likes_count }
          : post
      )
    );
  };

  const avatarUrl = user?.avatar ? getImageUrl(user.avatar) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : error ? (
              <div className="card p-6 text-center text-red-600">{error}</div>
            ) : posts.length === 0 ? (
              <div className="card p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Пока нет постов
                </h3>
                <p className="text-gray-600">
                  Будьте первым, кто создаст пост!
                </p>
              </div>
            ) : (
              <div>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="card p-6 sticky top-24">
              <div className="flex items-center space-x-4 mb-6">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-2xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500">@{user?.email?.split('@')[0]}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Поинты</span>
                  <span className="font-bold text-primary-600 text-lg">
                    {user?.points || 0}
                  </span>
                </div>

                <button className="w-full btn-primary">
                  Создать пост
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;

