// src/components/TokenRefresher.tsx
import { useEffect, useState } from 'react';
import authService from '../services/auth';

interface TokenRefresherProps {
  refreshInterval?: number; // in milliseconds
}

const TokenRefresher: React.FC<TokenRefresherProps> = ({ 
  refreshInterval = 4 * 60 * 1000 // Check every 4 minutes by default
}) => {
  const [lastRefreshed, setLastRefreshed] = useState<number>(Date.now());
  
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.log('No access token found');
        return;
      }
      
      // Check if token is expiring soon
      if (authService.isTokenExpiringSoon(token)) {
        console.log('Token is expiring soon, refreshing...');
        const success = await authService.refreshToken();
        
        if (success) {
          setLastRefreshed(Date.now());
          console.log('Token refreshed at:', new Date().toISOString());
        } else {
          console.log('Failed to refresh token, may need to re-login');
        }
      } else {
        console.log('Token is still valid, no refresh needed');
      }
    };
    
    // Check token immediately on component mount
    checkAndRefreshToken();
    
    // Set up interval to check token periodically
    const intervalId = setInterval(checkAndRefreshToken, refreshInterval);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [refreshInterval]);
  
  // This component doesn't render anything visible
  return null;
};

export default TokenRefresher;