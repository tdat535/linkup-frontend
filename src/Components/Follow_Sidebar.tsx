import React from "react";

const Follow_Sidebar: React.FC = () => (
    /** Follow Sidebar*/
    <div className="hidden lg:block lg:w-64 text-white bg-[#080A0B] fixed right-0 top-0 h-full overflow-y-auto">
        <aside className="border-l border-white p-5 min-h-screen">
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
    </div>
)

export default Follow_Sidebar;