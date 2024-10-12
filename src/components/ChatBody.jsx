import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import useFriendStore from "../stores/friendStore";
import { SocketContext } from "../contexts/SocketContext";

function ChatBody() {
  const socket = useContext(SocketContext);
  const token = useUserStore((state) => state.token);
  const activeChat = useFriendStore((state) => state.activeChat);
  console.log(activeChat);

  const [messages, setMessages] = useState([]);

  const getMessage = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/chat/getchatmessages/" + activeChat.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      setMessages(res.data.chatMessages);
      return res.data.chatMessages;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
    // return () => {
    //   socket.off("message");
    // };
  }, [socket]);

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {messages.map((el) => (
        <p>message</p>
      ))}
    </div>
  );
}

export default ChatBody;
