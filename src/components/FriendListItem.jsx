import React from "react";
import Avatar from "./Avatar";

function FriendListItem(props) {
  const { friend } = props;
  console.log(friend);
  return (
    <div className="flex gap-2 items-center p-2">
      <div className="w-7 h-7 p-1 bg-white rounded-full">
        <Avatar imgSrc={friend.user.Profile[0].profileImage} />
      </div>
      <p>{friend.user.Profile[0].name}</p>
    </div>
  );
}

export default FriendListItem;
