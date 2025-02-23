import React, { useState } from 'react';

const users = [
    { id: 1, name: "Nguyễn Văn A", username: "nguyenvana", avatar: "https://i.pravatar.cc/150?u=1", bio: "Lập trình viên Frontend" },
    { id: 2, name: "Trần Thị B", username: "tranthib", avatar: "https://i.pravatar.cc/150?u=2", bio: "Nhà thiết kế đồ họa" },
    { id: 3, name: "Lê Quốc C", username: "lequocc", avatar: "https://i.pravatar.cc/150?u=3", bio: "Chuyên viên marketing" },
];

export default function Search() {
    const [search, setSearch] = useState('');
    const filtererdUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
    const [loading, setLoading] = useState(false);
    const [followedUsers, setFollowedUsers] = useState<number[]>([]);

    // Xử lý tìm kiếm với hiệu ứng loading
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    // Xử lý Follow/Unfollow
    const handleFollow = (userId: number) => {
        setFollowedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    return (
        <div className="min-h-screen bg-[#080A0B] text-white p-4 flex flex-col items-center">
            <div className="w-full max-w-lg">
                <div className="relative">
                    {/* Search input */}
                    <svg className="w-6 h-6 text-gray-800 dark:text-white absolute left-3 top-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
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
                ) : filtererdUsers.length > 0 ? (filtererdUsers.map((user) => (
                    // User card  
                    <a href="#" className="bg-gray-800 my-2 p-3 flex items-center gap-3 rounded-lg">
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-gray-400">@{user.username}</p>
                            <p className="text-sm text-gray-500">{user.bio}</p>
                        </div>

                        <button
                            className={`px-3 py-1 rounded-lg flex items-center gap-2 ${followedUsers.includes(user.id) ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                                } text-white`}
                            onClick={() => handleFollow(user.id)}
                        >

                            {followedUsers.includes(user.id) ? <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                            </svg> : <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                            </svg>}
                            <span>{followedUsers.includes(user.id) ? "Đang theo dõi" : "Follow"}</span>
                        </button>
                    </a>
                ))) : (
                    <p className="text-gray-400 text-center mt-4">Không tìm thấy người dùng nào</p>
                )}
            </div>
        </div>
    )
};