import React from "react";
import FriendSelectHeader from "./FriendSelectHeader";
import axios from "axios";
import useUserStore from "../stores/userStore";
import useFriendStore from "../stores/friendStore";
import { useNavigate } from "react-router-dom";
import useUtilStore from "../stores/utilStore";

function FriendSelect() {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const friend = useFriendStore((state) => state.friend);
  const setActiveChat = useFriendStore((state) => state.setActiveChat);
  const navigate = useNavigate();

  console.log(user);
  console.log(friend);

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

  const createChat = async () => {
    try {
      //check if chat already exists
      const chats = await getAllChats();
      const chat = chats.filter((el) => {
        return (
          el.ChatMembers.some((el) => {
            return el.userId === friend.user.id;
          }) &&
          el.ChatMembers.some((el) => {
            return el.userId === user.id;
          })
        );
      });
      console.log(chat);
      if (chat.length > 0) {
        setActiveChat(chat[0]);
        // setActivePage("/chat");
        return navigate("/chat");
      }
      const body = {
        receiverId: friend.user.id,
        chatType: "PRIVATE",
      };
      const res = await axios.post(
        "http://localhost:8000/chat/createchat",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlStartChat = () => {
    createChat();
  };
  return (
    <div className="flex flex-col w-full">
      <FriendSelectHeader />
      <div className="bg-slate-200 h-full flex flex-col">
        <button>View Profile</button>
        <button onClick={hdlStartChat}>Start Chat</button>
      </div>
    </div>
  );
}

export default FriendSelect;
