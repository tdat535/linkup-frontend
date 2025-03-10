import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "Tôi" }]);
      setInput("");

      // Giả lập tin nhắn từ người khác sau 1 giây
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "Xin chào! Tôi là Bot.", sender: "Bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar trái */}
      <aside className={`fixed inset-0 md:left-64 md:w-64 bg-[#080A0B] shadow-lg border-r border-gray-400 z-50 ${isChatOpen ? "hidden md:block" : ""}`}>
        <ul>          
          <li className="p-2 hover:bg-gray-500 border-b border-gray-400 flex items-center gap-2 cursor-pointer" onClick={() => setIsChatOpen(true)}>
            <li onClick={() => navigate('/home')}>
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </li>
            <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Avatar" />
            <span>Username</span>
          </li>
        </ul>
      </aside>

      {/* Khu vực chat */}
      <div className={`flex-1 flex flex-col ml-0 md:ml-64 z-50 h-screen h-full ${!isChatOpen ? "hidden md:flex" : ""}`}>
        {/* Nút quay lại trên mobile */}
        <div className="p-4 bg-black border-b border-gray-400 fixed left-0 right-0 md:left-128 md:right-0 flex items-center">
          <button className="md:hidden p-2 bg-black rounded" onClick={() => setIsChatOpen(false)}>
            <ArrowLeft size={24} />
          </button>
          <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Avatar" />
          <span className="ml-4 text-white">Username</span>
        </div>

        {/* Phần hiển thị tin nhắn */}
        <div className="flex-1 overflow-y-auto pt-25 pb-20 pr-5 space-y-2 px-4 max-h-[calc(100vh-100px)]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "Tôi" ? "justify-end" : "justify-start items-center gap-2"}`}>
              {msg.sender !== "Tôi" && (
                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-6.jpg" alt="Avatar" />
              )}
              <div
                className={`max-w-2xl break-all whitespace-pre-wrap p-3 rounded-lg ${msg.sender === "Tôi" ? "bg-blue-500 text-white ml-auto" : "bg-gray-700 text-white"
                  }`}
              >
                <span className="block font-bold">{msg.sender}</span>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Ô nhập tin nhắn */}
        <div className="p-4 bg-black shadow-lg fixed bottom-0  h- left-0 right-0 md:left-128 md:right-0">

          <div className="flex justify-start gap-4 pb-3 pl-2">
            <label htmlFor="dropzone-file" className=" cursor-pointer">
              <svg className="w-8 h-8 text-blue-500 hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
              </svg>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>

            <label htmlFor="dropzone-file" className="cursor-pointer ">
              <svg className="w-8 h-8 text-blue-500 hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
              </svg>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div className="flex items-center">
            <TextareaAutosize
              className="w-full p-2 border rounded-lg resize-none focus:outline-none bg-gray-800 text-white"
              minRows={1}
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            />
            <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={sendMessage}>
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
