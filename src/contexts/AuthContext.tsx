// src/contexts/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  accessToken: string;
  refreshToken: string;
  userId: string;
  setAuthTokens: (accessToken: string, refreshToken: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Lấy token từ localStorage khi component được mount
    const storedAccessToken = localStorage.getItem('accessToken') || '';
    const storedRefreshToken = localStorage.getItem('refreshToken') || '';
    const storedUserId = localStorage.getItem('userId') || '';

    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
    setUserId(storedUserId);
  }, []);

  const setAuthTokens = (accessToken: string, refreshToken: string, userId: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserId(userId);

    // Lưu token vào localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setAccessToken('');
    setRefreshToken('');
    setUserId('');

    // Xóa token khỏi localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  };

  const value = {
    accessToken,
    refreshToken,
    userId,
    setAuthTokens,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};