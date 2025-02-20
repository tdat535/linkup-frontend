import React, { useState } from 'react';

const users = [
    { id: 1, name: "Nguyễn Văn A", username: "nguyenvana", avatar: "https://i.pravatar.cc/150?u=1", bio: "Lập trình viên Frontend" },
    { id: 2, name: "Trần Thị B", username: "tranthib", avatar: "https://i.pravatar.cc/150?u=2", bio: "Nhà thiết kế đồ họa" },
    { id: 3, name: "Lê Quốc C", username: "lequocc", avatar: "https://i.pravatar.cc/150?u=3", bio: "Chuyên viên marketing" },
  ];

export default function Search() {
    const [search, setSearch] = useState('');
    const filtererdUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
    
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
            <div className="w-full max-w-lg">
                <div className="relative">
                    {/* Search input */}
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>

                    <input 
                    type="text" 
                    placeholder="Tìm kiếm" 
                    className="pl-10 py-2 w-full bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-4 w-full max-w-lg">
                {filtererdUsers.length > 0 ? (filtererdUsers.map((user) => (
                    <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt=""/>
                    <div className="flex-1">
                        <p className="text-lg font-semibold">{user.name}</p>
                        <p className="text-gray-400">@{user.username}</p>
                        <p className="text-sm text-gray-500">{user.bio}</p>
                    </div>
                    
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                        </svg>
                        <span>Follow</span>
                    </button>
                </a>
                ))) : (
                    <p className="text-gray-400 text-center mt-4">Không tìm thấy người dùng nào</p>
                )}
            </div>
        </div>
    )
}
