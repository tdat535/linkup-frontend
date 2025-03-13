import React, { useEffect, useState, useRef } from "react";
import { FaHeart, FaComment, FaShare, FaArrowLeft } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  // State declarations
  const [user, setUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/80");
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") || "7";
  const currentUserId = searchParams.get("currentUserId") || "7";
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("post");
  
  // Ref to track if component is mounted
  const isMounted = useRef(false);

  const accessToken = localStorage.getItem("accessToken");

  // Component mount effect
  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  // First useEffect - Data fetching
  // Modified useEffect for ProfilePage.tsx 
  useEffect(() => {
    if (!userId || !currentUserId) {
      setError("Thiếu thông tin userId hoặc currentUserId.");
      setLoading(false);
      return;
    }
  
    if (!accessToken) {
      setError("Không tìm thấy token đăng nhập.");
      setLoading(false);
      return;
    }
  
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for userId:", userId, "currentUserId:", currentUserId);
        
        const response = await axios.get(
          `https://api-linkup.id.vn/api/auth/profile?userId=${userId}&currentUserId=${currentUserId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
  
        console.log("API Response:", response.data);
        
        if (response.data && response.data.isSuccess) {
          // The response is flat, with user data directly in the main object
          const userData = response.data;
          console.log("User data found:", userData);
          
          // Set the profile data using the flat structure
          setProfileData(userData);
          setUser(userData);
          setName(userData.username || "");
          setBio(userData.bio || "");
          setAvatar(userData.avatar || "/assets/default-avatar.png");
          setLoading(false);
        } else {
          console.error("Invalid response:", response.data);
          setError("Không tìm thấy người dùng.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Lỗi khi lấy profile:", err);
        setError("Có lỗi xảy ra khi tải profile.");
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [userId, currentUserId, accessToken]);

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Render loading or error states
  // Modified rendering section
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">⏳ Đang tải profile...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-xl text-red-500">❌ {error}</p>
        <p className="mt-2">Debug Info: userId={userId}, currentUserId={currentUserId}</p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Thử lại
        </button>
      </div>
    </div>
  );

  if (!user || !profileData) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-xl">Không có dữ liệu người dùng.</p>
        <p className="mt-2">Debug Info: userId={userId}, currentUserId={currentUserId}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1">
      <div className="">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 md:left-64 md:right-64 bg-black p-4 border-b border-gray-700 z-10 flex">
          <FaArrowLeft className="text-white text-lg cursor-pointer mt-2" />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{name || "Profile"}</h2>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col max-w-4xl mx-auto sm:flex-row items-center gap-4 pt-20 pb-8 px-4">
          <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{name || "User"}</h2>
            <p className="text-gray-400 text-sm">{user?.email || ""}</p>
            <div className="flex gap-6 mt-4 text-center">
              <div>1 Bài viết</div>
              <div>12 Theo dõi</div>
              <div>20 Đang theo dõi</div>
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
                className="w-full p-2 border rounded-md bg-gray-800 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextareaAutosize
                className="w-full p-2 border rounded-md resize-none mt-4 bg-gray-800 text-white"
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
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "post" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("post")}
                  role="tab"
                  aria-selected={activeTab === "post"}
                >
                  Bài đăng
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "followed" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("followed")}
                  role="tab"
                  aria-selected={activeTab === "followed"}
                >
                  Người theo dõi
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "follower" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("follower")}
                  role="tab"
                  aria-selected={activeTab === "follower"}
                >
                  Đang theo dõi
                </button>
              </li>
            </ul>
          </div>

          {/* Tab content */}
          <div>
            {/* Post content */}
            <div 
              role="tabpanel" 
              aria-labelledby="post-tab"
              className={activeTab === "post" ? "" : "hidden"}
            >
              {/* Post Item */}
              <div className="p-4 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{name || "User"}</h3>
                    <p className="text-gray-400 text-sm">4 giờ trước</p>
                  </div>
                </div>
                <p className="mt-2">Buổi sáng thức dậy bỗng thấy mình quá đẹp trai</p>
                <div className="flex gap-4 mt-3 text-gray-400">
                  <FaHeart /> <FaComment /> <FaShare />
                </div>
              </div>
            </div>
            
            {/* Followed content */}
            <div 
              role="tabpanel" 
              aria-labelledby="followed-tab"
              className={activeTab === "followed" ? "" : "hidden"}
            >
              <div className="p-4 border border-gray-700 rounded-lg">
                <p>Danh sách người theo dõi bạn sẽ hiển thị ở đây.</p>
              </div>
            </div>
            
            {/* Follower content */}
            <div 
              role="tabpanel" 
              aria-labelledby="follower-tab"
              className={activeTab === "follower" ? "" : "hidden"}
            >
              <div className="p-4 border border-gray-700 rounded-lg">
                <p>Danh sách người bạn đang theo dõi sẽ hiển thị ở đây.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;