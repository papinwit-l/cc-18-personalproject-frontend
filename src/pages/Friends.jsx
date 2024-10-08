import React from "react";
import FriendList from "../components/FriendList";

function Friends() {
  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <FriendList />
      </div>

      {/* Chat Content */}
      <div>Friends</div>
    </div>
  );
}

export default Friends;
