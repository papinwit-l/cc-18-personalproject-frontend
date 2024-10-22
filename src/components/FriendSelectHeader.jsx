import React from "react";
import useFriendStore from "../stores/friendStore";

function FriendSelectHeader() {
  const friend = useFriendStore((state) => state.friend);
  const setFriend = useFriendStore((state) => state.setFriend);
  // console.log(friend);

  const hdlBackBtn = () => {
    setFriend(null);
  };

  return (
    <div className="bg-slate-300 flex justify-between py-2 px-1">
      <button className="btn btn-sm bg-black text-white" onClick={hdlBackBtn}>
        Back
      </button>
      <div>{friend.user.Profile[0].name}</div>
    </div>
  );
}

export default FriendSelectHeader;
