import React, { useContext, useEffect, useRef, useState } from "react";
import useUtilStore from "../stores/utilStore";
import { SocketContext } from "../contexts/SocketContext";
import useUserStore from "../stores/userStore";
import MessageItem from "./MessageItem";
import axios from "axios";
import useFriendStore from "../stores/friendStore";

function GroupChatBody() {
  const socket = useContext(SocketContext);
  const chatBottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const activeGroup = useFriendStore((state) => state.activeGroup);

  const groupMessageImageModal = useUtilStore(
    (state) => state.groupMessageImageModal
  );
  const setGroupMessageImageModal = useUtilStore(
    (state) => state.setGroupMessageImageModal
  );
  const token = useUserStore((state) => state.token);

  const getMessage = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/chat/getchatmessages/" + activeGroup.id,
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
  }, [activeGroup]);

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

  return (
    <>
      <div className="flex-1 bg-white overflow-y-auto flex flex-col gap-2 p-2">
        {messages.map((el) => (
          <MessageItem key={el.id} messageChat={el} />
        ))}
        <div ref={chatBottomRef}></div>
      </div>
      <dialog id="group-message-image-modal" className="modal mx-auto">
        <div className="modal-box bg-opacity-0 rounded-md">
          {/* if there is a button in form, it will close the modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={(e) => {
              setGroupMessageImageModal("");
              e.target.closest("#group-message-image-modal").close();
            }}
          >
            ✕
          </button>

          {groupMessageImageModal && (
            <img src={groupMessageImageModal} alt="image" />
          )}
        </div>
      </dialog>
    </>
  );
}

export default GroupChatBody;
