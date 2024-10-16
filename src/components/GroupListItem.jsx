import React from "react";
import Avatar from "./Avatar";
import useFriendStore from "../stores/friendStore";

function GroupListItem(props) {
  const { group } = props;
  const activeGroup = useFriendStore((state) => state.activeGroup);
  const setActiveGroup = useFriendStore((state) => state.setActiveGroup);
  //   console.log(group);
  const { chatImage: groupImage, name: groupName } = group;
  return activeGroup && activeGroup.id === group.id ? (
    <div
      className="flex flex-col p-2 bg-gray-200 hover:bg-gray-100"
      onClick={() => setActiveGroup(group)}
    >
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 rounded-full bg-white overflow-hidden">
          <Avatar imgSrc={groupImage} />
        </div>
        <p>{groupName}</p>
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col p-2 bg-gray-300 hover:bg-gray-100"
      onClick={() => setActiveGroup(group)}
    >
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 rounded-full bg-white overflow-hidden">
          <Avatar imgSrc={groupImage} />
        </div>
        <p>{groupName}</p>
      </div>
    </div>
  );
}

export default GroupListItem;
