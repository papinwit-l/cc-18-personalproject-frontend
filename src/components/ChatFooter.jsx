import React, { useContext, useState } from "react";
import useUserStore from "../stores/userStore";
import { SocketContext } from "../contexts/SocketContext";
import useFriendStore from "../stores/friendStore";

function ChatFooter() {
  const socket = useContext(SocketContext);
  const activeChat = useFriendStore((state) => state.activeChat);
  const chatId = activeChat.id;
  const user = useUserStore((state) => state.user);
  const user_name = user.profile.name;
  //   console.log(user_name);
  const [message, setMessage] = useState("");

  const hdlOnchange = (e) => {
    setMessage(e.target.value);
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    if (message && user_name) {
      socket.emit("message", {
        message: message,
        name: user_name,
        serderId: user.id,
        chatId: chatId,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className="h-[3rem]">
      <form
        className="w-full h-full flex items-center gap-2 p-2"
        onSubmit={hdlSubmit}
      >
        <input
          type="text"
          className="flex-1 h-full rounded-full border-2 border-slate-300 p-2"
          placeholder="Enter a message"
          value={message}
          onChange={hdlOnchange}
        />
        <button className="btn btn-sm">Send</button>
      </form>
    </div>
  );
}

export default ChatFooter;
