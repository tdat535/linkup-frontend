import React from 'react';
import ChatUI from '../../components/Layout/Messages/ChatUI';

const Messages: React.FC = () => {
  return (
    <div className="messages-container">
      <ChatUI />
    </div>
  );
};

export default Messages;