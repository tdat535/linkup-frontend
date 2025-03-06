import axios from "axios";

// Base URL của API
const API_BASE_URL = "https://api-linkup.id.vn/api/follow";

// Lấy token từ localStorage (hoặc context nếu bạn đã dùng)
const getToken = () => localStorage.getItem("accessToken");

// Hàm gọi API để tạo lượt theo dõi
export const createFollow = async (userId: string) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/createFollow`,
            { followeeId: userId }, // Dữ liệu gửi lên server
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Đính kèm token
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Lỗi khi tạo lượt theo dõi:", error.response?.data || error.message);
        throw error;
    }
};

// Hàm gọi API để chấp nhận lượt theo dõi
export const acceptFollow = async (followRequestId: string) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/acceptedFollow`,
            { requestId: followRequestId }, // ID của yêu cầu theo dõi
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Lỗi khi chấp nhận lượt theo dõi:", error.response?.data || error.message);
        throw error;
    }
};
