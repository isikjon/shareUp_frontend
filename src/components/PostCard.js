import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services';
import { useAuth } from '../context/AuthContext';
import { getImageUrl } from '../utils/helpers';
import CommentsModal from './CommentsModal';

function PostCard({ post: initialPost, onDelete }) {
  const { user } = useAuth();
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [liking, setLiking] = useState(false);

  const handleLike = async () => {
    if (liking) return;
    
    setLiking(true);
    try {
      const result = await postService.toggleLike(post.id);
      setPost({
        ...post,
        isLiked: result.liked,
        likes_count: result.likes_count,
      });
    } catch (err) {
      console.error('Error toggling like:', err);
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Удалить пост?')) return;

    try {
      await postService.deletePost(post.id);
      if (onDelete) onDelete(post.id);
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Ошибка удаления поста');
    }
  };

  const canDelete = user && (user.id === post.user_id || user.is_admin);

  return (
    <>
      <div className="card mb-6 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <Link to={`/profile/${post.user_id}`} className="flex items-center space-x-3 hover:opacity-75 transition">
            {post.user.avatar ? (
              <img
                src={getImageUrl(post.user.avatar)}
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-bold">
                  {post.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{post.user.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </Link>
          {canDelete && (
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>

        {post.content && (
          <div className="px-4 pb-3">
            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          </div>
        )}

        {post.image && (
          <div className="w-full">
            <img
              src={getImageUrl(post.image)}
              alt="Post"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{post.likes_count} {post.likes_count === 1 ? 'лайк' : 'лайков'}</span>
            <button
              onClick={() => setShowComments(true)}
              className="hover:text-primary-600 transition"
            >
              {post.comments_count} {post.comments_count === 1 ? 'комментарий' : 'комментариев'}
            </button>
          </div>
          
          <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
            <button
              onClick={handleLike}
              disabled={liking}
              className={`flex items-center space-x-2 flex-1 justify-center py-2 rounded-lg transition ${
                post.isLiked
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg
                className={`w-6 h-6 ${liking ? 'animate-pulse' : ''}`}
                fill={post.isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="font-medium">{post.isLiked ? 'Нравится' : 'Лайк'}</span>
            </button>
            
            <button
              onClick={() => setShowComments(true)}
              className="flex items-center space-x-2 flex-1 justify-center py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="font-medium">Комментировать</span>
            </button>
          </div>
        </div>
      </div>

      {showComments && (
        <CommentsModal
          post={post}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
}

export default PostCard;
