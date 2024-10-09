import React from "react";
import FriendBar from "../components/FriendBar";

function Friends() {
  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <FriendBar />
      </div>

      {/* Chat Content */}
      <div>Friends</div>
    </div>
  );
}

export default Friends;
