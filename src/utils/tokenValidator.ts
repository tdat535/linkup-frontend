// src/utils/tokenValidator.ts

// Kiểm tra xem token có đúng định dạng JWT không
export const isValidJWT = (token: string): boolean => {
    if (!token) return false;
    
    // JWT thường có 3 phần ngăn cách bởi dấu chấm
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    try {
      // Thử parse phần payload để xem token có hợp lệ không
      const payload = JSON.parse(atob(parts[1]));
      
      // Kiểm tra xem token có hết hạn chưa
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        console.warn('Token has expired');
        return false;
      }
      
      return true;
    } catch (e) {
      console.error('Invalid token format', e);
      return false;
    }
  };
  
  // Hàm để kiểm tra token và lấy thông tin
  export const checkToken = (accessToken: string): void => {
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    
    console.log('Token validation status:', isValidJWT(accessToken));
    
    try {
      // Kiểm tra xem token có định dạng đúng không
      const parts = accessToken.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log('Token payload:', payload);
        console.log('Token expiration:', new Date(payload.exp * 1000).toLocaleString());
      }
    } catch (e) {
      console.error('Error parsing token', e);
    }
  };