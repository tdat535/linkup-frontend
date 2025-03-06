import React, { useState } from 'react';
import Follow_Button from '../Buttons/Follow_Button'; // Adjust the import path as needed

const users = [
    { id: 1, name: "Nguyễn Văn A", username: "nguyenvana", avatar: "https://i.pravatar.cc/150?u=1", bio: "Lập trình viên Frontend" },
    { id: 2, name: "Trần Thị B", username: "tranthib", avatar: "https://i.pravatar.cc/150?u=2", bio: "Nhà thiết kế đồ họa" },
    { id: 3, name: "Lê Quốc C", username: "lequocc", avatar: "https://i.pravatar.cc/150?u=3", bio: "Chuyên viên marketing" },
];

export default function Search() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Current user ID (you would typically get this from auth context)
    const currentUserId = 'current-user-123'; 

    // State to track followed users
    const [followedUsers, setFollowedUsers] = useState<number[]>([]);

    // Filter users based on search input
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    // Xử lý tìm kiếm với hiệu ứng loading
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    // Handle follow success callback
    const handleFollowSuccess = (userId: number, isFollowed: boolean) => {
        setFollowedUsers((prev) =>
            isFollowed 
                ? [...prev, userId]  // Add to followed users if now following
                : prev.filter((id) => id !== userId)  // Remove if unfollowed
        );
    };

    return (
        <div className="min-h-screen bg-[#080A0B] text-white p-4 flex flex-col items-center">
            <div className="w-full max-w-lg">
                <div className="relative">
                    {/* Search input */}
                    <svg className="w-6 h-6 text-gray-800 dark:text-white absolute left-3 top-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="pl-10 py-2 w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="mt-4 w-full max-w-lg">
                {loading ? (
                    <p className="text-gray-400 text-center mt-4 animate-pulse">Đang tìm kiếm...</p>
                ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className="bg-gray-800 my-2 p-3 flex items-center gap-3 rounded-lg">
                            <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-12 h-12 rounded-full" 
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{user.name}</p>
                                <p className="text-gray-400">@{user.username}</p>
                                <p className="text-sm text-gray-500">{user.bio}</p>
                            </div>

                            <Follow_Button 
                                followerId={currentUserId}
                                followingId={user.id.toString()} // Convert to string for API
                                initialFollowState={followedUsers.includes(user.id)}
                                onFollowSuccess={(isFollowed) => handleFollowSuccess(user.id, isFollowed)}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-4">Không tìm thấy người dùng nào</p>
                    
                )}
            </div>
        </div>
    );
}