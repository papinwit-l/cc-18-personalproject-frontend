import React, { Profiler, useEffect } from "react";
import FriendBar from "../components/FriendBar";
import useFriendStore from "../stores/friendStore";
import FriendSelect from "../components/FriendSelect";

function Friends() {
  const friend = useFriendStore((state) => state.friend);

  useEffect(() => {
    // console.log(friend);
  }, [friend]);

  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <FriendBar />
      </div>

      {/* Chat Content */}

      {friend ? (
        <FriendSelect />
      ) : (
        <div className="w-full h-full bg-[url(./public/bg_logo.jpg)] bg-no-repeat bg-[length:300px_300px] bg-center bg-[#cfcfcf]"></div>
      )}
    </div>
  );
}

export default Friends;
