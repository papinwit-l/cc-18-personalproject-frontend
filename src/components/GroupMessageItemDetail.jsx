import React from "react";
import useUtilStore from "../stores/utilStore";

function GroupMessageItemDetail(props) {
  const { message, messageType } = props;
  const setGroupMessageImageModal = useUtilStore(
    (state) => state.setGroupMessageImageModal
  );

  const showMessageImageModal = (e) => {
    e.preventDefault();
    setGroupMessageImageModal(message);
    document.getElementById("group-message-image-modal").showModal();
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

export default GroupMessageItemDetail;
