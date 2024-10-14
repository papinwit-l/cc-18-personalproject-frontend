import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import useUserStore from "../stores/userStore";
import useFriendStore from "../stores/friendStore";
import { SocketContext } from "../contexts/SocketContext";
import MessageItem from "./MessageItem";
import useUtilStore from "../stores/utilStore";

function ChatBody() {
  const chatBottomRef = useRef(null);
  const socket = useContext(SocketContext);
  const token = useUserStore((state) => state.token);
  const activeChat = useFriendStore((state) => state.activeChat);
  const messageImageModal = useUtilStore((state) => state.messageImageModal);
  const setMessageImageModal = useUtilStore(
    (state) => state.setMessageImageModal
  );
  // console.log(activeChat);

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
      setTimeout(() => {
        scrollBottom();
      }, 0);
      return res.data.chatMessages;
    } catch (error) {
      console.log(error);
    }
  };

  const scrollBottom = () => {
    chatBottomRef.current?.scrollIntoView();
  };

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      // console.log(data);
      setMessages((prev) => {
        // console.log(data);
        // console.log(prev);
        return [...prev, data.message];
      });
      setTimeout(() => {
        scrollBottom();
      }, 0);
    });

    return () => {
      socket.off("message");
      setTimeout(() => {
        scrollBottom();
      }, 0);
    };
  }, [socket]);

  // useEffect(() => {
  //   socket.on("message", (data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <>
      <div className="flex-1 bg-white overflow-y-auto flex flex-col gap-2 p-2">
        {messages.map((el) => (
          <MessageItem key={el.id} messageChat={el} />
        ))}
        <div ref={chatBottomRef}></div>
      </div>
      <dialog id="message-image-modal" className="modal mx-auto">
        <div className="modal-box bg-opacity-0 rounded-md">
          {/* if there is a button in form, it will close the modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={(e) => {
              setMessageImageModal("");
              e.target.closest("#message-image-modal").close();
            }}
          >
            ✕
          </button>

          {messageImageModal && <img src={messageImageModal} alt="image" />}
        </div>
      </dialog>
    </>
  );
}

export default ChatBody;
