import React from "react";
import ChatList from "../components/ChatList";

function Chat() {
  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <ChatList />
      </div>

      {/* Chat Content */}
      <div>Chat</div>
    </div>
  );
}

export default Chat;
