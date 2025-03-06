import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare, FaArrowLeft } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { Tabs } from "flowbite";
import type { TabsOptions, TabItem } from "flowbite";

const ProfilePage = () => {
  const [user, setUser] = useState<{ username: string, email: string, phonenumber: string, realname: string } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("SoHanDz29");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/80");
  const [posts] = useState(1);
  const [followers] = useState(12);
  const [following] = useState(20);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setAvatar(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  useEffect(() => {
    const tabsElement = document.getElementById("default-tab");
    if (!tabsElement) return;
  
    const tabButtons = document.querySelectorAll("[data-tabs-target]");
    const tabContents = document.querySelectorAll("[role='tabpanel']");
  
    if (tabButtons.length > 0) {
      const tabElements: TabItem[] = Array.from(tabButtons).map((btn) => ({
        id: btn.getAttribute("data-tabs-target")!,
        triggerEl: btn as HTMLElement,
        targetEl: document.getElementById(btn.getAttribute("data-tabs-target")!)!,
      }));
  
      new Tabs(tabsElement, tabElements, {
        defaultTabId: "post",
        activeClasses: "text-blue-600 border-blue-600",
        inactiveClasses: "text-gray-500 border-transparent",
      });
    }
  }, []);
  

  return (
    <div className="flex-1">
      <div className="mt-30">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 md:left-64 md:right-64 bg-black p-4 border-b border-gray-700 z-10 flex">
          <FaArrowLeft className="text-white text-lg cursor-pointer mt-2" />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{user?.username}</h2>
            <p className="text-gray-400 text-sm">{posts} Bài viết</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col max-w-4xl mx-auto sm:flex-row items-center gap-4 pt-5 pb-8 px-4">
          <img src={avatar} alt="Avatar" className="w-30 h-30 rounded-full" />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <p className="text-gray-400 text-sm break-words whitespace-pre-wrap max-w-xs">
              {bio || "Chưa có tiểu sử"}
            </p>
            <div className="flex gap-6 mt-2 text-center">
              <div>
                <p className="font-bold">{posts}</p>
                <p className="text-gray-400 text-xs">Bài viết</p>
              </div>
              <div>
                <p className="font-bold">{followers}</p>
                <p className="text-gray-400 text-xs">Người theo dõi</p>
              </div>
              <div>
                <p className="font-bold">{following}</p>
                <p className="text-gray-400 text-xs">Đang theo dõi</p>
              </div>
            </div>
          </div>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => setOpenModal(true)}>
            Sửa hồ sơ
          </button>
        </div>

        {/* Edit Profile Modal */}
        {openModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-black mt-25 p-6 rounded-md w-full max-w-md sm:max-w-lg md:max-w-xl h-full sm:h-auto overflow-y-auto text-white">
              <h2 className="text-lg font-bold mb-4">Sửa Hồ Sơ</h2>
              <input
                type="text"
                placeholder="Tên"
                className="w-full p-2 border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <img
                src={avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full p-2" />
                
              <input
                type="file"
                className="w-full p-2 border rounded-md mb-2"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <TextareaAutosize
                className="w-full p-2 border rounded-md resize-none"
                minRows={2}
                maxRows={5}
                placeholder="Nhập tiểu sử (tối đa 160 ký tự)"
                value={bio}
                maxLength={160}
                onChange={(e) => setBio(e.target.value)}
              />
              <p className="text-gray-400 text-sm text-right">{bio.length}/160</p>
              <div className="flex justify-end gap-2 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setOpenModal(false)}>
                  Lưu
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setOpenModal(false)}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="mt-4 max-w-5xl mx-auto space-y-6">
          {/* Tabs */}
          <div className="mb-4 border-b border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg active"
                  id="Post-tab"
                  type="button"
                  role="tab"
                  aria-controls="post"
                  aria-selected="true"
                  data-tabs-target="post"
                >
                  Bài đăng
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-400 hover:border-gray-500"
                  id="Followed-tab"
                  type="button"
                  role="tab"
                  aria-controls="followed"
                  aria-selected="false"
                  data-tabs-target="followed"
                >
                  Người theo dõi
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-400 hover:border-gray-500"
                  id="Follower-tab"
                  type="button"
                  role="tab"
                  aria-controls="follower"
                  aria-selected="false"
                  data-tabs-target="follower"
                >
                  Đang theo dõi
                </button>
              </li>
            </ul>
          </div>

          {/* Nội dung của các tab */}
          <div>
            {/* Post Item */}
            <div className="p-4 border border-gray-700 rounded-lg" id="post" role="tabpanel">
              <div className="flex items-center gap-3">
                <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-gray-400 text-sm">4 giờ trước</p>
                </div>
              </div>
              <p className="mt-2">Buổi sáng thức dậy bỗng thấy mình quá đẹp trai</p>
              <div className="flex gap-4 mt-3 text-gray-400">
                <FaHeart /> <FaComment /> <FaShare />
              </div>
            </div>
          
            {/* Followed Item */} 
            <div>
              <div className="p-4 border border-gray-700 rounded-lg" id="followed" role="tabpanel">
                <div className="flex items-center gap-3">
                  <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </div>

            {/* Follower Item */}
            <div className="p-4 border border-gray-700 rounded-lg" id="follower" role="tabpanel">
                <div className="flex items-center gap-3">
                  <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
