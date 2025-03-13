import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Messages from './Pages/Messages';
import Notifications from './Pages/Notifications';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import FollowTest from './Pages/FollowTest';
import TokenRefresher from './Components/TokenRefresher';

const App: React.FC = () => {
  // Changed this to be more explicit about what we're checking for
  const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <TokenRefresher refreshInterval={3 * 60 * 1000} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}/>
        {token ? (
          <Route path="/home" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Explore />} />
              <Route path="messages" element={<Messages />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
              <Route path="follow-test" element={<FollowTest accessToken={token} />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;