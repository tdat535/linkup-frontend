// src/services/followService.ts

import axios from 'axios';

const API_URL = 'https://api-linkup.id.vn';

// Hàm tạo lượt theo dõi
export const createFollow = async (
  followerId: string,
  followingId: string,
  accessToken: string
): Promise<any> => {
  try {
    console.log('Creating follow with token:', accessToken);
    
    const response = await axios.post(
      `${API_URL}/api/follow/createFollow`,
      {
        followerId,
        followingId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating follow:', error);
    // Log chi tiết lỗi để debug
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error;
  }
};

// Hàm chấp nhận lượt theo dõi
export const acceptFollow = async (
  followerId: string,
  followingId: string,
  accessToken: string
): Promise<any> => {
  try {
    console.log('Accepting follow with token:', accessToken);
    
    const response = await axios.post(
      `${API_URL}/api/follow/acceptedFollow`,
      {
        followerId,
        followingId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error accepting follow:', error);
    // Log chi tiết lỗi để debug
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error;
  }
};