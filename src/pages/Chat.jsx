import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";

function Chat(props) {
  const { socket } = props;
  const [chatActive, setChatActive] = useState(false);
  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <ChatList />
      </div>

      {/* Chat Content */}
      <div className="flex-1 h-full flex flex-col bg-slate-300">
        {chatActive && (
          <>
            <ChatHeader />
            <ChatBody />
            <ChatFooter socket={socket} />
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
