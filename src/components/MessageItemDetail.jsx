import React from "react";
import useUtilStore from "../stores/utilStore";

function MessageItemDetail(props) {
  const { message, messageType } = props;
  const setMessageImageModal = useUtilStore(
    (state) => state.setMessageImageModal
  );

  const showMessageImageModal = (e) => {
    e.preventDefault();
    setMessageImageModal(message);
    document.getElementById("message-image-modal").showModal();
  };

  return (
    <div>
      {messageType === "TEXT" && <div>{message}</div>}
      {messageType === "IMAGE" && (
        <img
          src={message}
          alt="image"
          className="w-16 h-16 rounded-lg cursor-pointer"
          onClick={showMessageImageModal}
        />
      )}
    </div>
  );
}

export default MessageItemDetail;
