import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { likeService } from '../services';
import { formatDate, getImageUrl } from '../utils/helpers';

function PostCard({ post, onLikeToggle }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const result = await likeService.toggleLike(post.id);
      setIsLiked(result.liked);
      setLikesCount(result.likes_count);
      if (onLikeToggle) onLikeToggle(post.id, result);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  const avatarUrl = post.user?.avatar ? getImageUrl(post.user.avatar) : null;
  const imageUrl = post.image ? getImageUrl(post.image) : null;

  return (
    <div className="card overflow-hidden mb-6">
      <div className="p-4 flex items-center space-x-3">
        <Link to={`/profile/${post.user?.id}`}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={post.user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-bold">
                {post.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </Link>
        <div className="flex-1">
          <Link
            to={`/profile/${post.user?.id}`}
            className="font-semibold text-gray-900 hover:text-primary-600 transition"
          >
            {post.user?.name}
          </Link>
          <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
        </div>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post"
          className="w-full object-cover max-h-[600px]"
        />
      )}

      <div className="p-4">
        <div className="flex items-center space-x-6 mb-3">
          <button
            onClick={handleLike}
            disabled={loading}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition disabled:opacity-50"
          >
            <svg
              className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'fill-none'}`}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="font-medium">{likesCount}</span>
          </button>

          <Link
            to={`/post/${post.id}`}
            className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-medium">{post.comments_count || 0}</span>
          </Link>
        </div>

        <div className="text-gray-900">
          <Link
            to={`/profile/${post.user?.id}`}
            className="font-semibold hover:text-primary-600 transition"
          >
            {post.user?.name}
          </Link>{' '}
          <span className="text-gray-700">{post.content}</span>
        </div>

        {post.comments_count > 0 && (
          <Link
            to={`/post/${post.id}`}
            className="text-sm text-gray-500 hover:text-gray-700 mt-2 inline-block"
          >
            Посмотреть все комментарии ({post.comments_count})
          </Link>
        )}
      </div>
    </div>
  );
}

export default PostCard;

