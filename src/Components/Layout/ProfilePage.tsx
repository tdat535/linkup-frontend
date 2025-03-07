import React, { useEffect, useState, useRef } from "react";
import { FaHeart, FaComment, FaShare, FaArrowLeft } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { Tabs } from "flowbite";
import type { TabsOptions, TabItem } from "flowbite";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  // State declarations
  const [user, setUser] = useState<{ username: string; email: string; phonenumber: string } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("SoHanDz29");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150");
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const currentUserId = searchParams.get("currentUserId");
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Ref to track if component is mounted
  const isMounted = useRef(false);
  // Ref to track if tabs are initialized
  const tabsInitialized = useRef(false);

  const accessToken = localStorage.getItem("accessToken");

  // Component mount effect
  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  // First useEffect - Data fetching
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
        const response = await axios.get(
          `https://api-linkup.id.vn/api/auth/profile?userId=${userId}&currentUserId=${currentUserId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.data?.isSuccess) {
          const userData = response.data.data;
          setProfileData(userData);
          setUser({
            username: userData.Username,
            email: userData.Email,
            phonenumber: userData.Phonenumber,
          });

          // Cập nhật các state khác
          setName(userData.Username);
          setAvatar(userData.Avatar || "https://via.placeholder.com/80"); // Avatar null sẽ có ảnh mặc định
        } else {
          setError("Không tìm thấy người dùng.");
        }
      } catch (err) {
        console.error("Lỗi khi lấy profile:", err);
        setError("Có lỗi xảy ra khi tải profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, currentUserId, accessToken]);

  // Initialize tabs after render
  useEffect(() => {
    // Skip if already initialized or still loading
    if (tabsInitialized.current || loading || !isMounted.current) return;
    
    const initializeTabs = () => {
      const tabsElement = document.getElementById("default-tab");
      
      if (!tabsElement) {
        console.error("Tab element not found, will retry");
        return false;
      }
      
      // Get all tab buttons
      const postTab = document.getElementById("post-tab");
      const followedTab = document.getElementById("followed-tab");
      const followerTab = document.getElementById("follower-tab");
      
      // Get all tab content panels
      const postContent = document.getElementById("post-content");
      const followedContent = document.getElementById("followed-content");
      const followerContent = document.getElementById("follower-content");
      
      // Check if all elements exist
      if (!postTab || !followedTab || !followerTab || 
          !postContent || !followedContent || !followerContent) {
        console.error("Some tab elements not found, will retry");
        return false;
      }
      
      // Define tab items
      const tabElements: TabItem[] = [
        {
          id: "post",
          triggerEl: postTab,
          targetEl: postContent
        },
        {
          id: "followed",
          triggerEl: followedTab,
          targetEl: followedContent
        },
        {
          id: "follower",
          triggerEl: followerTab,
          targetEl: followerContent
        }
      ];

      // Options with default values
      const options: TabsOptions = {
        defaultTabId: "post",
        activeClasses: "text-blue-600 border-blue-600",
        inactiveClasses: "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300",
        onShow: () => {
          console.log("Tab is shown");
        }
      };

      try {
        // Initialize tabs
        const tabs = new Tabs(tabsElement, tabElements, options);
        
        // Show default tab
        tabs.show("post");
        
        // Set initialized flag
        tabsInitialized.current = true;
        console.log("Tabs successfully initialized");
        return true;
      } catch (error) {
        console.error("Error initializing tabs:", error);
        return false;
      }
    };
    
    // Try to initialize tabs immediately
    const initialized = initializeTabs();
    
    // If not initialized, try again with a delay
    if (!initialized) {
      const intervalId = setInterval(() => {
        if (initializeTabs() || !isMounted.current) {
          clearInterval(intervalId);
        }
      }, 500);
      
      // Clear interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [loading]);

  // Reset tabs initialized flag when component unmounts
  useEffect(() => {
    return () => {
      tabsInitialized.current = false;
    };
  }, []);

  // Render loading or error states
  if (loading) return <p>⏳ Đang tải profile...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!profileData) return <p>Không có dữ liệu profile.</p>;

  return (
    <div className="flex-1">
      <div className="">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 md:left-64 md:right-64 bg-black p-4 border-b border-gray-700 z-10 flex">
          <FaArrowLeft className="text-white text-lg cursor-pointer mt-2" />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{profileData.username}</h2>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col max-w-4xl mx-auto sm:flex-row items-center gap-4 pt-20 pb-8 px-4">
          <img src={"https://i.pravatar.cc/150"} alt="Avatar" className="w-20 h-20 rounded-full" />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{profileData.username}</h2>
            <p className="text-gray-400 text-sm">{profileData.email}</p>
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
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg"
                  id="post-tab"
                  type="button"
                  role="tab"
                  aria-controls="post"
                  aria-selected="true"
                >
                  Bài đăng
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-400 hover:border-gray-500"
                  id="followed-tab"
                  type="button"
                  role="tab"
                  aria-controls="followed"
                  aria-selected="false"
                >
                  Người theo dõi
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-400 hover:border-gray-500"
                  id="follower-tab"
                  type="button"
                  role="tab"
                  aria-controls="follower"
                  aria-selected="false"
                >
                  Đang theo dõi
                </button>
              </li>
            </ul>
          </div>

          {/* Tab content */}
          <div>
            {/* Post content */}
            <div id="post-content" role="tabpanel" aria-labelledby="post-tab">
              {/* Post Item */}
              <div className="p-4 border border-gray-700 rounded-lg">
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
            </div>
            
            {/* Followed content */}
            <div id="followed-content" className="hidden" role="tabpanel" aria-labelledby="followed-tab">
              <div className="p-4 border border-gray-700 rounded-lg">
                <p>Danh sách người theo dõi bạn sẽ hiển thị ở đây.</p>
              </div>
            </div>
            
            {/* Follower content */}
            <div id="follower-content" className="hidden" role="tabpanel" aria-labelledby="follower-tab">
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