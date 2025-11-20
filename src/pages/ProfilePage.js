import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { profileService, postService } from '../services';
import Header from '../components/common/Header';
import PostCard from '../components/PostCard';
import { getImageUrl } from '../utils/helpers';

function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwnProfile = currentUser?.id === parseInt(id);

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProfile = async () => {
    try {
      const profileData = await profileService.getProfile(id);
      setProfile(profileData);
      
      const postsData = await postService.getUserPosts(id);
      setPosts(postsData.data || []);
    } catch (err) {
      setError('Ошибка загрузки профиля');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card p-6 text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  const avatarUrl = profile?.avatar ? getImageUrl(profile.avatar) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={profile?.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center border-4 border-primary-200">
                <span className="text-primary-600 font-bold text-5xl">
                  {profile?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile?.name}
              </h1>
              <p className="text-gray-500 mb-4">@{profile?.email?.split('@')[0]}</p>
              
              {profile?.bio && (
                <p className="text-gray-700 mb-4">{profile.bio}</p>
              )}

              <div className="flex justify-center sm:justify-start space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {profile?.posts_count || 0}
                  </div>
                  <div className="text-sm text-gray-500">Постов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {profile?.likes_count || 0}
                  </div>
                  <div className="text-sm text-gray-500">Лайков</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {profile?.points || 0}
                  </div>
                  <div className="text-sm text-gray-500">Поинтов</div>
                </div>
              </div>

              {isOwnProfile && (
                <Link
                  to="/profile/edit"
                  className="btn-secondary inline-block"
                >
                  Редактировать профиль
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isOwnProfile ? 'Мои посты' : 'Посты пользователя'}
          </h2>
        </div>

        {posts.length === 0 ? (
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
              {isOwnProfile ? 'У вас пока нет постов' : 'У пользователя пока нет постов'}
            </h3>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

