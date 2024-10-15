import React from "react";
import Avatar from "./Avatar";
import axios from "axios";
import useUserStore from "../stores/userStore";

function GroupPendingListItem(props) {
  const { group } = props;

  const token = useUserStore((state) => state.token);

  const { chatImage: groupImage, name: groupName, id: groupId } = group.chat;
  //   console.log(groupImage);
  //   console.log(group);

  const groupReject = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/group/rejectinvite/" + groupId,
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

  const hdlReject = () => {
    groupReject();
  };

  const groupAccept = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8000/group/acceptinvite/" + groupId,
        {},
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

  const hdlAccept = () => {
    groupAccept();
  };

  return (
    <div className="flex flex-col p-2 bg-gray-300">
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 rounded-full bg-white">
          <Avatar imgSrc={groupImage} />
        </div>
        <p>{groupName}</p>
      </div>
      <div className="flex items-center justify-evenly">
        <button onClick={hdlAccept}>Accept</button>
        <button onClick={hdlReject}>Reject</button>
      </div>
    </div>
  );
}

export default GroupPendingListItem;
