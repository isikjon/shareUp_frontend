import React, { useEffect, useState, useRef } from 'react';
import { commentService } from '../services';
import { useAuth } from '../context/AuthContext';
import { getImageUrl } from '../utils/helpers';

function CommentsModal({ post, onClose }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    loadComments();
  }, [post.id]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const loadComments = async () => {
    try {
      const data = await commentService.getComments(post.id);
      setComments(data.data || []);
    } catch (err) {
      setError('Ошибка загрузки комментариев');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const comment = await commentService.createComment(post.id, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (err) {
      setError('Ошибка отправки комментария');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Удалить комментарий?')) return;

    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      setError('Ошибка удаления комментария');
    }
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row"
      >
        <div className="lg:w-2/3 bg-black flex items-center justify-center">
          {post.image ? (
            <img
              src={getImageUrl(post.image)}
              alt="Post"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-white p-8">
              <p className="text-lg">{post.content}</p>
            </div>
          )}
        </div>

        <div className="lg:w-1/3 flex flex-col h-full max-h-[90vh] lg:max-h-full">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
              <span className="font-semibold text-gray-900">{post.user.name}</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {post.content && (
              <div className="pb-4 border-b border-gray-200">
                <p className="text-gray-800">{post.content}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Пока нет комментариев
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  {comment.user.avatar ? (
                    <img
                      src={getImageUrl(comment.user.avatar)}
                      alt={comment.user.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 text-sm font-bold">
                        {comment.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">{comment.user.name}</p>
                      <p className="text-gray-800 mt-1">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{new Date(comment.created_at).toLocaleDateString('ru-RU')}</span>
                      {comment.user_id === user?.id && (
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Добавить комментарий..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentsModal;

