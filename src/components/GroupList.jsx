import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import GroupListItem from "./GroupListItem";
import axios from "axios";

function GroupList(props) {
  const { setToPending, groupList } = props;

  const showGroupCreateModal = (e) => {
    e.preventDefault();
    document.getElementById("group-create-modal").showModal();
  };

  return (
    <div className="bg-slate-400 h-full w-full flex flex-col">
      <nav className="flex justify-between items-center p-2">
        <button onClick={showGroupCreateModal}>Create group</button>
        <button onClick={() => setToPending(true)}>Pending</button>
      </nav>
      {groupList.map((el) => (
        <GroupListItem key={el.id} group={el} />
      ))}
    </div>
  );
}

export default GroupList;
