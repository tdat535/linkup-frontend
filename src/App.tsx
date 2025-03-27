import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './Components/Layout';
import Home from './Pages/User_Page/Home';
import Explore from './Pages/User_Page/Explore';
import Messages from './Pages/User_Page/Messages';
import Notifications from './Pages/User_Page/Notifications';
import Profile from './Pages/User_Page/Profile';
import Login from './Pages/User_Page/Login';
import Register from './Pages/User_Page/Register';
import FollowTest from './Pages/User_Page/FollowTest';
import TokenRefresher from './Components/TokenRefresher';
import { ThemeProvider } from "./context/ThemeContext";

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
    <ThemeProvider>
      <Router>
        <TokenRefresher refreshInterval={3 * 60 * 1000} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
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
    </ThemeProvider>
  );
};

export default App;