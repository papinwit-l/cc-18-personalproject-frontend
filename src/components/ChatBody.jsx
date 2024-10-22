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
  const chatTopRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);

  const [messages, setMessages] = useState([]);

  const getMessage = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP + "/chat/getchatmessages/" + activeChat.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const getMoreMessage = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP +
          "/chat/getmoremessages/" +
          activeChat.id +
          "/" +
          messages[0].id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data.chatMessages;
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = async (e) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop === 0) {
      setIsOnTop(true);
      const moreMessages = await getMoreMessage();
      if (moreMessages && moreMessages.length > 0) {
        setMessages((prevMessages) => [...moreMessages, ...prevMessages]);
      }
    } else {
      setIsOnTop(false);
    }
  };

  useEffect(() => {
    getMessage();
  }, [activeChat]);

  useEffect(() => {
    socket.on("message-" + activeChat.id, (data) => {
      if (data.message.chatId == activeChat.id) {
        setMessages((prev) => {
          return [...prev, data.message];
        });
      }
      if (chatBottomRef.current) {
        chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => {
      socket.off("message-" + activeChat.id);
      setTimeout(() => {
        scrollBottom();
      }, 0);
    };
  }, [socket, activeChat]);

  return (
    <>
      <div
        className="flex-1 bg-white overflow-y-auto flex flex-col gap-2 p-2 w-full"
        onScroll={handleScroll}
      >
        <div ref={chatTopRef}></div>
        {messages.map((el) => (
          <MessageItem key={el.id} messageChat={el} />
        ))}
        <div ref={chatBottomRef}></div>
      </div>
      <dialog id="message-image-modal" className="modal mx-auto">
        <div className="modal-box bg-opacity-0 rounded-md">
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
