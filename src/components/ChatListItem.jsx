import React from "react";
import Avatar from "./Avatar";
import useFriendStore from "../stores/friendStore";

function ChatListItem(props) {
  const { chat, ...restProps } = props;
  const friend = chat.ChatMembers[0].user;

  const activeChat = useFriendStore((state) => state.activeChat);
  const setActiveChat = useFriendStore((state) => state.setActiveChat);
  console.log(activeChat.id == chat.id);
  console.log(friend);

  return (
    <div
      className={
        "flex gap-2 py-2 items-center hover:bg-slate-200 " + restProps.className
      }
      onClick={() => setActiveChat(chat)}
    >
      <div className="w-7 h-7 bg-white p-1 rounded-full">
        <Avatar imgSrc={friend.Profile[0].profileImage} />
      </div>
      {friend.Profile[0].name}
    </div>
  );
}

export default ChatListItem;
