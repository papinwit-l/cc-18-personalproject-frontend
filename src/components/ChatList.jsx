import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { SocketContext } from "../contexts/SocketContext";
import ChatListItem from "./ChatListItem";
import useFriendStore from "../stores/friendStore";

function ChatList() {
  const socket = useContext(SocketContext);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const [chatList, setChatList] = useState([]);
  const activeChat = useFriendStore((state) => state.activeChat);

  const getAllChats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/chat/getallprivatechats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data.chats;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllChats().then((res) => {
      setChatList(
        res.map((el) => ({
          ...el,
          ChatMembers: el.ChatMembers.filter((el) => {
            return el.userId !== user.id;
          }),
        }))
      );
    });
  }, []);
  return (
    <div className="bg-slate-400 h-full">
      ChatList
      <div className="flex flex-col">
        {chatList.map((el) =>
          activeChat.id == el.id ? (
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
