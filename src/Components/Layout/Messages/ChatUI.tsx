import React, { useEffect, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { connectSocket, disconnectSocket, getSocket } from "../../socket";
import { Messenger } from "./Messenger";
import { MessengerDetail } from "./MessengerDetail";
import { User } from "./User";

const ChatPage = ({ theme }: { theme: string }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversations, setConversations] = useState<Messenger[]>([]);
  const [messages, setMessages] = useState<MessengerDetail[]>([]);
  const [input, setInput] = useState("");
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const currentUserId = Number(localStorage.getItem("currentUserId"));
  useEffect(() => {
    if (!currentUserId) return;
    const socket = connectSocket();

    socket.emit("userOnline", currentUserId);

    socket.on("receiveMessage", (newMessage: MessengerDetail) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("notification", (data) => {
      console.log("🔔 Notification:", data);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("notification");
      disconnectSocket();
    };
  }, [currentUserId]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          "https://api-linkup.id.vn/api/texting/getMessenger",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              withCredentials: true,
            },
          }
        );
        if (res.data.isSuccess) {
          setConversations(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi fetch hội thoại:", err);
      }
    };
    fetchConversations();
  }, []);

  const loadConversation = async (userId: string) => {
    try {
      const res = await axios.get(
        "https://api-linkup.id.vn/api/texting/getMessengerDetail",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: { otherUserId: userId },
        }
      );

      if (res.data.isSuccess) {
        const messageList: MessengerDetail[] = res.data.data;
        setMessages(messageList);
        setIsChatOpen(true);
      
        // Xác định người còn lại
        const msg = messageList[0];
        if (msg.senderId !== currentUserId) {
          setOtherUser(msg.sender); // sender là người còn lại
        } else {
          // Nếu sender là currentUser, thì không có thông tin receiver -> dùng tạm từ danh sách hội thoại
          const found = conversations.find(c => c.user.id.toString() === userId);
          if (found) setOtherUser(found.user);
        }
      }
      
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết tin nhắn:", err);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !otherUser) return;
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const message = {
      senderId: currentUserId,
      receiverId: otherUser.id,
      content: input.trim(),
      image: null,
    };

    try {
      const socket = getSocket();
      socket.emit("sendMessage", message);
    } catch (err) {
      console.error("Socket chưa được kết nối:", err);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: input.trim(),
        image: null,
        receivingDate: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        senderId: currentUserId,
        receiverId: otherUser.id,
        sender: {
          id: currentUserId,
          username: "Tôi",
          avatar: currentUser.avatar || null,
        },
      },
    ]);

    setInput("");
  };
  
  return (
    <div className="flex h-screen">
      {/* Sidebar trái */}
      <aside
        className={`fixed inset-0 md:left-64 ${
          theme === "dark"
            ? "bg-[#1C1C1D] text-white border-r border-gray-500"
            : "bg-[#f0f2f5] border-r border-gray-300 text-black"
        } md:w-64 shadow-lg z-50 ${isChatOpen ? "hidden md:block" : ""}`}
      >
        <ul>
          {conversations.map((conv, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-500 border-b border-gray-400 flex items-center gap-2 cursor-pointer"
              onClick={() => loadConversation(conv.user.id.toString())}
            >
              <img
                className="w-10 h-10 rounded-full"
                src={conv.user.avatar || "/default-avatar.jpg"}
                alt="Avatar"
              />
              <span>{conv.user.username}</span>
            </li>
          ))}
        </ul>
      </aside>
  
      {/* Chi tiết chat */}
      <div
        className={`flex-1 flex flex-col ml-0 md:ml-64 z-50 h-full ${
          !isChatOpen ? "hidden md:flex" : ""
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b border-gray-400 sticky left-0 right-0 md:left-128 md:right-0 flex items-center ${
            theme === "dark" ? "bg-[#1C1C1D] text-white" : "bg-white text-black"
          }`}
        >
          <button
            className={`md:hidden p-2 rounded ${
              theme === "dark" ? "bg-[#1C1C1D]" : "bg-white"
            }`}
            onClick={() => setIsChatOpen(false)}
          >
            <ArrowLeft size={24} />
          </button>
          <img
            className="w-10 h-10 rounded-full"
            src={otherUser?.avatar || "/default-avatar.jpg"}
            alt="Avatar"
          />
          <span
            className={`ml-4 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {otherUser?.username || "Chọn cuộc trò chuyện"}
          </span>
        </div>
  
        {/* Nội dung tin nhắn */}
        <div
          className={`flex-1 overflow-y-auto p-10 space-y-2 max-h-[calc(100vh-100px)] ${
            theme === "dark"
              ? "bg-[#1C1C1D] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender?.id === Number(currentUserId)
                  ? "justify-end"
                  : "justify-start"
              } items-center gap-2`}
            >
              {/* Nếu người gửi không phải currentUserId, ảnh nằm phía trước */}
              {msg.sender?.id !== Number(currentUserId) && (
                <img
                  className="w-8 h-8 rounded-full"
                  src={msg.sender?.avatar || "/default-avatar.jpg"}
                  alt="Avatar"
                />
              )}
  
              {/* Tin nhắn */}
              <div
                className={`break-all whitespace-pre-wrap max-w-[80%] md:max-w-[60%] p-3 rounded-lg ${
                  msg.sender?.id === Number(currentUserId)
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-700 text-white"
                }`}
              >
                {msg.content}
              </div>
  
              {/* Nếu người gửi là currentUserId, ảnh nằm phía sau */}
              {msg.sender?.id === Number(currentUserId) && (
                <img
                  className="w-8 h-8 rounded-full"
                  src={msg.sender?.avatar || "/default-avatar.jpg"}
                  alt="Avatar"
                />
              )}
            </div>
          ))}
        </div>
  
        {/* Nhập tin nhắn */}
        <div
          className={`p-4 shadow-lg sticky bottom-0 left-0 right-0 md:left-128 md:right-0 ${
            theme === "dark"
              ? "bg-[#1C1C1D] text-white"
              : "bg-[#f0f2f5] text-black"
          }`}
        >
          <div className="flex items-center">
            <TextareaAutosize
              className="w-full p-2 border rounded-lg resize-none focus:outline-none"
              minRows={1}
              maxRows={5}
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={sendMessage}
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatPage;