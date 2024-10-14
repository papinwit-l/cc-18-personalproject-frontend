import React from "react";
import useUserStore from "../stores/userStore";
import MessageItemDetail from "./MessageItemDetail";

function MessageItem(props) {
  const { messageChat } = props;
  const {
    chatId,
    userId: senderId,
    message,
    createdAt,
    updatedAt,
    messageType,
  } = messageChat;

  const currentUser = useUserStore((state) => state.user);

  return currentUser.id === senderId ? (
    <div className="flex justify-end">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </div>
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <MessageItemDetail message={message} messageType={messageType} />
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
          <div className="bg-gray-200 p-2 rounded-lg">
            <MessageItemDetail message={message} messageType={messageType} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
