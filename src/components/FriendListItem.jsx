import React from "react";
import Avatar from "./Avatar";
import useFriendStore from "../stores/friendStore";

function FriendListItem(props) {
  const { friend } = props;
  const setFriend = useFriendStore((state) => state.setFriend);
  const friendSet = useFriendStore((state) => state.friend);
  // console.log(friend);
  // console.log(friendSet);

  const hdlSetFriend = () => {
    setFriend(friend);
  };

  return friendSet && friend.user.id === friendSet.user.id ? (
    <div
      className="flex gap-2 items-center p-2 bg-slate-200 hover:bg-slate-300"
      onClick={hdlSetFriend}
    >
      <div className="w-7 h-7 bg-white rounded-full overflow-hidden">
        <Avatar imgSrc={friend.user.Profile[0].profileImage} />
      </div>
      <p>{friend.user.Profile[0].name}</p>
    </div>
  ) : (
    <div
      className="flex gap-2 items-center p-2 hover:bg-slate-300"
      onClick={hdlSetFriend}
    >
      <div className="w-7 h-7 bg-white rounded-full overflow-hidden">
        <Avatar imgSrc={friend.user.Profile[0].profileImage} />
      </div>
      <p>{friend.user.Profile[0].name}</p>
    </div>
  );
}

export default FriendListItem;
