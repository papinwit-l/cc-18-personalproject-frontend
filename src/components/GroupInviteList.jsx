import React from "react";
import Avatar from "./Avatar";

function GroupInviteList(props) {
  const { friend } = props;
  //   console.log(friend);
  return (
    <div className="flex flex-1 items-center gap-2 py-1 px-2">
      <div className="w-7 h-7 bg-white rounded-full overflow-hidden">
        <Avatar imgSrc={friend.user.Profile[0].profileImage} />
      </div>
      <p>{friend.user.Profile[0].name}</p>
    </div>
  );
}

export default GroupInviteList;
