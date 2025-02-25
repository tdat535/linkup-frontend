import React, { useState } from "react";
import { FaHeart, FaComment, FaShare, FaArrowLeft } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

const ProfilePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("SoHanDz29");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/80");
  const [posts] = useState(1);
  const [followers] = useState(12);
  const [following] = useState(20);

  return (
    <div className="flex-1 pt-4">
      <div className="">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-700"><FaArrowLeft className="text-white text-lg cursor-pointer" />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-gray-400 text-sm">{posts} Bài viết</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col max-w-4xl mx-auto sm:flex-row items-center gap-4 p-4 ">
          <img
            src={avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{name}</h2>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-full max-w-md sm:max-w-lg md:max-w-xl h-full sm:h-auto overflow-y-auto text-black">
              <h2 className="text-lg font-bold mb-4">Sửa Hồ Sơ</h2>
              <input
                type="text"
                placeholder="Tên"
                className="w-full p-2 border rounded-md mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ảnh đại diện (URL)"
                className="w-full p-2 border rounded-md mb-2"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setOpenModal(false)}>Lưu</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setOpenModal(false)}>Hủy</button>
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="mt-4 space-y-6">
          {/* Post Item */}
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-gray-400 text-sm">4 giờ trước</p>
              </div>
            </div>
            <p className="mt-2">Buổi sáng thức dậy bỗng thấy mình quá đẹp trai 😏</p>
            <div className="flex gap-4 mt-3 text-gray-400">
              <FaHeart /> <FaComment /> <FaShare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
