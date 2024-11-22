import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { SocketContext } from "../contexts/SocketContext";
import ChatListItem from "./ChatListItem";
import useFriendStore from "../stores/friendStore";
import useUtilStore from "../stores/utilStore";

function ChatList() {
  const socket = useContext(SocketContext);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const [chatList, setChatList] = useState([]);
  const activeChat = useFriendStore((state) => state.activeChat);
  const notifySound = new Audio("../assets/notify.mp3");
  const elevateChatOnMsg = useUtilStore((state) => state.elevateChatOnMsg);
  // console.log(activeChat);

  const getAllChats = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP + "/chat/getallprivatechats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      return res.data.chats;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllChats().then((res) => {
      const data = res.map((el) => ({
        ...el,
        ChatMembers: el.ChatMembers.filter((el) => {
          return el.userId !== user.id;
        }),
      }));
      setChatList(data);
    });
  }, []);

  useEffect(() => {
    socket.on("chatNotify-" + user.id, (data) => {
      console.log(data);
      if (data.chatType === "PRIVATE") {
        setChatList((prevChatList) => {
          const newChatlist = [...prevChatList];
          const index = newChatlist.findIndex((el) => el.id == data.chatId);
          if (index !== -1) {
            // newChatlist[index].notify = true;
            // move to top
            newChatlist.unshift(newChatlist.splice(index, 1)[0]);
          }
          // console.log(newChatlist);
          return newChatlist;
        });
      }
    });
    return () => {
      socket.off("chatNotify-" + user.id);
    };
  }, [socket]);

  useEffect(() => {
    if (elevateChatOnMsg) {
      setChatList((prevChatList) => {
        const newChatlist = [...prevChatList];
        const index = newChatlist.findIndex((el) => el.id == elevateChatOnMsg);
        if (index !== -1) {
          // newChatlist[index].notify = true;
          // move to top
          newChatlist.unshift(newChatlist.splice(index, 1)[0]);
        }
        // console.log(newChatlist);
        return newChatlist;
      });
    }
  }, [elevateChatOnMsg]);

  return (
    <div className="bg-slate-400 h-full">
      <p className="p-2 border-t border-b">Chat List:</p>
      <div className="flex flex-col">
        {chatList.map((el) =>
          activeChat && activeChat.id == el.id ? (
            <ChatListItem key={el.id} chat={el} className="bg-slate-500" />
          ) : (
            <ChatListItem key={el.id} chat={el} />
          )
        )}
      </div>
    </div>
  );
}

export default ChatList;
