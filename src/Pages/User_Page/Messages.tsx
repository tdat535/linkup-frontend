import React from 'react';
import ChatUI from '../../Components/Layout/Messages/ChatUI';

const Messages: React.FC = () => {
  return (
    <div className="messages-container">
      <ChatUI />
    </div>
  );
};

export default Messages;