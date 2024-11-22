import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import useFriendStore from "../stores/friendStore";

function Chat() {
  const activeChat = useFriendStore((state) => state.activeChat);
  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <ChatList />
      </div>

      {/* Chat Content */}
      <div className="flex-1 w-full h-full flex flex-col bg-[url(../bg_logo.jpg)] bg-no-repeat bg-[length:300px_300px] bg-center bg-[#cfcfcf]">
        {activeChat && (
          <>
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
