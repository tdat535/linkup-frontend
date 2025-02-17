import React from "react";

const Follow_Sidebar: React.FC = () => {
    return (
        <aside className="w-64 border-l-1 boder-white p-5 min-h-screen fixed right-0 top-0 overflow-y-auto ">
            <h2 className="text-lg font-semibold mb-4">Đã theo dõi</h2>
            <ul className="space-y-3">
            <li className="flex items-center space-x-3">
                <img src="https://casaseguro.asia/wp-content/uploads/2022/10/dau-tu-dinh-cu-anh-quoc-casa-seguro-0001.jpg" className="rounded-full w-10 h-10" alt="avatar" />
                <span>Sekhan229</span>
            </li>
            <li className="flex items-center space-x-3">
                <img src="https://via.placeholder.com/40" className="rounded-full w-10 h-10" alt="avatar" />
                <span>Toat1212</span>
            </li>
            <li className="flex items-center space-x-3">
                <img src="https://via.placeholder.com/40" className="rounded-full w-10 h-10" alt="avatar" />
                <span>buingocminh</span>
            </li>
            <li className="flex items-center space-x-3">
                <img src="https://via.placeholder.com/40" className="rounded-full w-10 h-10" alt="avatar" />
                <span>MonMon</span>
            </li>
            </ul>
        </aside>
    );
}

export default Follow_Sidebar;