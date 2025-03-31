import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import UsersPage from '../pages/dashboard/UserPage';
import Dashboard from '../components/Layout/Management/Dashboard/Dashboard';
import Admin_Layout from '../components/AdminLayout';
import PostsPage from '../pages/dashboard/PostsPage';
import ErrorPage from '../pages/ErrorPage';
import FeatureDevelopingPage from '../pages/FeatureDevelopingPage';
import CommentPage from '../pages/dashboard/CommentPage';

const Home = lazy(() => import('../pages/user/Home'));
const Explore = lazy(() => import('../pages/user/Explore'));
const Messages = lazy(() => import('../pages/user/Messages'));
const Notifications = lazy(() => import('../pages/user/Notifications'));
const Profile = lazy(() => import('../pages/user/Profile'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const FollowTest = lazy(() => import('../pages/user/FollowTest'));
const TokenRefresher = lazy(() => import('../components/TokenRefresher'));


// import Home from '../pages/user/Home';
// import Explore from './pages/user/Explore';
// import Messages from './pages/user/Messages';
// import Notifications from './pages/user/Notifications';
// import Profile from './pages/user/Profile';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import FollowTest from './pages/user/FollowTest';
// import TokenRefresher from './components/TokenRefresher';
// import { ThemeProvider } from "./context/ThemeContext";


const AppRoutes = ({token}: { token: string | null }) => {
 
  return (
      <>
        <TokenRefresher refreshInterval={3 * 60 * 1000} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            {token ? (
                <>
                    <Route path="/home" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="search" element={<Explore />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="follow-test" element={<FollowTest accessToken={token} />} />
                        <Route path="users" element={<UsersPage />} />
                    </Route>

                    <Route path="/admin" element={<Admin_Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="users-list" element={<UsersPage />} />
                        <Route path="posts-list" element={<PostsPage />} />
                        <Route path="comments-list" element={<CommentPage/>} />
                    </Route>

                    <Route path='*' element={<ErrorPage />} />
                    <Route path="/developing" element={<FeatureDevelopingPage />} />
                </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </Suspense>
      </>
  );
};

export default AppRoutes;