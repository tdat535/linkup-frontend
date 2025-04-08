import React from 'react';
import ChatPage from '../../Components/layout/messages/ChatUI';

const Messages: React.FC = () => {
  return (
    <div className="messages-container">
      <ChatPage theme={''} />
    </div>
  );
};

export default Messages;