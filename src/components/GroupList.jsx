import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import GroupListItem from "./GroupListItem";
import axios from "axios";
import { SocketContext } from "../contexts/SocketContext";

function GroupList(props) {
  const socket = useContext(SocketContext);
  const currentUser = useUserStore((state) => state.user);
  const { setToPending, groupList, getGroupList } = props;

  const showGroupCreateModal = (e) => {
    e.preventDefault();
    document.getElementById("group-create-modal").showModal();
  };

  return (
    <div className="bg-slate-400 h-full w-full flex flex-col">
      <nav className="flex justify-between items-center py-2 px-1">
        <button className="btn btn-sm" onClick={showGroupCreateModal}>
          Create group
        </button>
        <button className="btn btn-sm" onClick={() => setToPending(true)}>
          Pending
        </button>
      </nav>
      <p className="border-t border-b py-2 px-1">Group List:</p>
      <div className="overflow-y-auto">
        {groupList.map((el) => (
          <GroupListItem key={el.id} group={el} />
        ))}
      </div>
    </div>
  );
}

export default GroupList;
