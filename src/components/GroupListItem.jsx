import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import useFriendStore from "../stores/friendStore";
import useUtilStore from "../stores/utilStore";

function GroupListItem(props) {
  const { group } = props;
  const activeGroup = useFriendStore((state) => state.activeGroup);
  const setActiveGroup = useFriendStore((state) => state.setActiveGroup);
  //   console.log(group);
  const {
    chatImage: groupImage,
    name: groupName,
    ChatMembers: groupMembers,
  } = group;

  const groupNotify = useUtilStore((state) => state.groupNotify);
  const setGroupNotify = useUtilStore((state) => state.setGroupNotify);
  const [notify, setNotify] = useState(false);

  const hdlSelectGroup = () => {
    setActiveGroup(group);
    setNotify(false);
  };

  const updateNotify = async (notify) => {
    socket.emit("updateGroupNotify", {
      groupId: group.id,
      userId: user.id,
      messageId: notify[0].messageId,
    });
  };

  useEffect(() => {
    const tempNotify = groupNotify.filter((el) => el.groupId == group.id);
    if (tempNotify.length > 0) {
      if (activeGroup && activeGroup.id === tempNotify[0].groupId) {
        setNotify(false);
        updateNotify(tempNotify);
      } else {
        setNotify(tempNotify[0].value);
      }
    }
  }, [groupNotify, activeGroup]);

  return activeGroup && activeGroup.id === group.id ? (
    <div
      className="flex flex-col p-2 bg-gray-200 hover:bg-gray-100"
      onClick={() => setActiveGroup(group)}
    >
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 rounded-full bg-white overflow-hidden">
          <Avatar imgSrc={groupImage} />
        </div>
        <p>
          {groupName} ({groupMembers.length})
        </p>
      </div>
      {notify && <div className="bg-red-500 w-2 h-2 rounded-full"></div>}
    </div>
  ) : (
    <div
      className="flex flex-col p-2 bg-gray-300 hover:bg-gray-100"
      onClick={() => hdlSelectGroup()}
    >
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 rounded-full bg-white overflow-hidden">
          <Avatar imgSrc={groupImage} />
        </div>
        <p>
          {groupName} ({groupMembers.length})
        </p>
      </div>
      {notify && <div className="bg-red-500 w-2 h-2 rounded-full"></div>}
    </div>
  );
}

export default GroupListItem;
