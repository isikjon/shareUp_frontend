import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/common/PrivateRoute';
import { AdminRoute } from './components/common/AdminRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
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
                  <div>Profile Page</div>
                </PrivateRoute>
              }
            />
            
            <Route
              path="/profile/me"
              element={
                <PrivateRoute>
                  <div>My Profile Page</div>
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
                  <div>Points Page</div>
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
  );
}

export default App;
