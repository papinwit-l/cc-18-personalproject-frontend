import React from "react";
import Avatar from "./Avatar";
import useFriendStore from "../stores/friendStore";

function FriendListItem(props) {
  const { friend } = props;
  const setFriend = useFriendStore((state) => state.setFriend);
  console.log(friend);

  const hdlSetFriend = () => {
    setFriend(friend);
  };

  return (
    <div
      className="flex gap-2 items-center p-2 hover:bg-slate-300"
      onClick={hdlSetFriend}
    >
      <div className="w-7 h-7 p-1 bg-white rounded-full">
        <Avatar imgSrc={friend.user.Profile[0].profileImage} />
      </div>
      <p>{friend.user.Profile[0].name}</p>
    </div>
  );
}

export default FriendListItem;
