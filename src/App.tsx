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

const App: React.FC = () => {
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
      <Routes>
        {token ? (
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Explore />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
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