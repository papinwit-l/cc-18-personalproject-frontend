import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import MessageItemDetail from "./MessageItemDetail";
import GroupMessageItemDetail from "./GroupMessageItemDetail";
import axios from "axios";

function GroupMessageItem(props) {
  const { messageChat } = props;
  const {
    chatId,
    userId: senderId,
    message,
    createdAt,
    updatedAt,
    messageType,
  } = messageChat;
  const token = useUserStore((state) => state.token);
  const currentUser = useUserStore((state) => state.user);
  const [sender, setSender] = useState(null);

  // console.log(messageChat);

  const findSender = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_HOST_IP}/chat/getsenderdetails/${senderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    setSender(res.data.sender);
    return res.data;
  };

  useEffect(() => {
    // findSender();
  }, [messageChat]);

  return currentUser.id === senderId ? (
    <div className="flex justify-end">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </div>
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <GroupMessageItemDetail
              message={message}
              messageType={messageType}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-start">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start">
          <div className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </div>
          <div>{messageChat.user.Profile[0].name}</div>
          <div className="bg-gray-200 p-2 rounded-lg">
            <GroupMessageItemDetail
              message={message}
              messageType={messageType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupMessageItem;
