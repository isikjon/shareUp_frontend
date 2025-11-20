import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PrivateRoute } from './components/common/PrivateRoute';
import { AdminRoute } from './components/common/AdminRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import PointsPage from './pages/PointsPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Navigate to="/feed" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route
                path="/feed"
                element={
                  <PrivateRoute>
                    <FeedPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/profile/:id"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/profile/edit"
                element={
                  <PrivateRoute>
                    <EditProfilePage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/create-post"
                element={
                  <PrivateRoute>
                    <CreatePostPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/post/:id"
                element={
                  <PrivateRoute>
                    <div>Post Page</div>
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/points"
                element={
                  <PrivateRoute>
                    <PointsPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/notifications"
                element={
                  <PrivateRoute>
                    <NotificationsPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <div>Admin Dashboard</div>
                  </AdminRoute>
                }
              />
              
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <div>Admin Users Page</div>
                  </AdminRoute>
                }
              />
              
              <Route
                path="/admin/posts"
                element={
                  <AdminRoute>
                    <div>Admin Posts Page</div>
                  </AdminRoute>
                }
              />
              
              <Route
                path="/admin/logs"
                element={
                  <AdminRoute>
                    <div>Admin Logs Page</div>
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
