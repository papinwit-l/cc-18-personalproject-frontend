import React, { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import useFriendStore from "../stores/friendStore";
import useUtilStore from "../stores/utilStore";
import axios from "axios";
import { SocketContext } from "../contexts/SocketContext";
import useUserStore from "../stores/userStore";

function ChatListItem(props) {
  const socket = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  const { chat, ...restProps } = props;
  const friend = chat.ChatMembers[0].user;
  const activeChat = useFriendStore((state) => state.activeChat);
  const setActiveChat = useFriendStore((state) => state.setActiveChat);
  const chatNotify = useUtilStore((state) => state.chatNotify);
  // console.log(chatNotify);
  // console.log(chatNotify.filter((el) => el.chatId == chat.id));
  const [notify, setNotify] = useState(false);

  const hdlSelectedChat = () => {
    setActiveChat(chat);
    setNotify(false);
    chat.notify = false;
  };

  const updateNotify = async (notify) => {
    socket.emit("updateChatNotify", {
      chatId: chat.id,
      userId: user.id,
      messageId: notify[0].messageId,
    });
  };

  useEffect(() => {
    // console.log(chatNotify);
    const tempNotify = chatNotify.filter((el) => el.chatId == chat.id);
    // console.log(tempNotify);
    if (tempNotify.length > 0) {
      if (activeChat && activeChat.id === tempNotify[0].chatId) {
        // console.log("active");
        setNotify(false);
        updateNotify(tempNotify);
      } else {
        // console.log("not active");
        setNotify(tempNotify[0].value);
      }
    }
  }, [chatNotify, activeChat]);

  return (
    <div
      className={
        "flex px-3 py-2 items-center hover:bg-slate-200 justify-between " +
        restProps.className
      }
      onClick={() => hdlSelectedChat()}
    >
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 bg-white rounded-full overflow-hidden">
          <Avatar imgSrc={friend.Profile[0].profileImage} />
        </div>
        {friend.Profile[0].name}
      </div>
      {notify && <div className="bg-red-500 w-2 h-2 rounded-full"></div>}
    </div>
  );
}

export default ChatListItem;
