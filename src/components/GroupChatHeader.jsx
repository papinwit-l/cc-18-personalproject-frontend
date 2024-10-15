import React from "react";
import useFriendStore from "../stores/friendStore";

function GroupChatHeader() {
  const activeGroup = useFriendStore((state) => state.activeGroup);
  const setActiveGroup = useFriendStore((state) => state.setActiveGroup);

  console.log(activeGroup);

  return (
    <div className="bg-slate-200 h-[3rem] flex justify-between items-center px-2">
      <div className="flex gap-2 items-center h-full">
        <button
          className="btn btn-sm bg-black text-white"
          onClick={() => setActiveGroup(null)}
        >
          Back
        </button>
        <h1>{activeGroup.name}</h1>
      </div>
      <button>More</button>
    </div>
  );
}

export default GroupChatHeader;
