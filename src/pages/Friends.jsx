import React, { useEffect } from "react";
import FriendBar from "../components/FriendBar";
import useFriendStore from "../stores/friendStore";
import FriendSelect from "../components/FriendSelect";

function Friends() {
  const friend = useFriendStore((state) => state.friend);

  useEffect(() => {
    console.log(friend);
  }, [friend]);

  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <FriendBar />
      </div>

      {/* Chat Content */}
      {friend ? <FriendSelect /> : <div>Friends</div>}
    </div>
  );
}

export default Friends;
