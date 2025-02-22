import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react"; // Import icon quay lại
import TextareaAutosize from "react-textarea-autosize"; // Import TextareaAutosize

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // Kiểm soát hiển thị nội dung chat

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };
  return (
    <div className="">
      {/* Sidebar trái, có thể nhấp khi ở màn hình lớn */}
      <aside className={`fixed inset-0 md:left-auto md:right-0 md:top-0 border-l border-gray-400 md:w-64 md:h-full  bg-[#080A0B] shadow-lg  z-50 ${isChatOpen ? 'hidden md:block' : ''}`}>
        <h2 className="text-lg font-bold mb-4"></h2>
        <ul>
          <li className="p-2 hover:bg-gray-500 border-b border-gray-400  mb-2 flex cursor-pointer" onClick={() => setIsChatOpen(true)}>
             <span><img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" /></span>username
          </li>
        </ul>
      </aside>
      {/* Khu vực chat */}
      <div className={`flex-1 flex flex-col ml-0 mr-0 h-full ${!isChatOpen ? 'hidden md:flex' : ''}`}>

        {/* Nút quay lại trên mobile */}
        <button className="md:hidden p-2 bg-black rounded" onClick={() => setIsChatOpen(false)}><ArrowLeft size={24} /></button>

        {/* Phần hiển thị tin nhắn */}
        <div className="flex-1  overflow-y-auto p-4 space-y-2 ms-20 max-h-[calc(100vh-100px)]">
          {messages.map((msg, index) => (
            <div key={index} className="max-w-fit break-all whitespace-pre-wrap bg-blue-500 text-white p-2 ms-auto rounded-lg">
              {msg}
            </div>
          ))}
        </div>

        <div className="p-4 bg-black  fixed border-b border-gray-400 left-0 right-0 md:left-64 md:right-64">
          dpoipigkmogfmomo
        </div>

        {/* Ô nhập tin nhắn cố định */}
        <div className="p-4 bg-black shadow-lg fixed bottom-0 left-0 right-0 md:left-64 md:right-64">
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
              className="w-full p-2 border rounded-lg resize-none focus:outline-none"
              minRows={1}
              maxRows={6}
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()} />

            <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={sendMessage}><Send size={24} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
