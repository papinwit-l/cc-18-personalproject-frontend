import React from "react";
import GroupList from "../components/GroupList";

function Group() {
  return (
    <div className="bg-slate-100 h-full flex">
      {/* Chat List */}
      <div className="w-[300px] h-full">
        <GroupList />
      </div>

      {/* Chat Content */}
      <div>Groups</div>
    </div>
  );
}

export default Group;
