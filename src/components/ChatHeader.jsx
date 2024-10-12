import React from "react";
import useFriendStore from "../stores/friendStore";

function ChatHeader() {
  const activeChat = useFriendStore((state) => state.activeChat);
  // console.log(activeChat);
  const friend = activeChat.ChatMembers[0].user;
  // console.log(friend);
  return (
    <div className="bg-slate-200 h-[3rem] flex justify-between items-center px-2">
      <div className="flex gap-2 items-center h-full">
        <button className="btn btn-sm bg-black text-white">Back</button>
        <h1>{friend.Profile[0].name}</h1>
      </div>
      <button>More</button>
    </div>
  );
}

export default ChatHeader;
