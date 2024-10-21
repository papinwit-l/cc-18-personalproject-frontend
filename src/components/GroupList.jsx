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

  // useEffect(() => {
  //   socket.on("groupUpdate-", +currentUser.id, () => {
  //     console.log("groupUpdate-", +currentUser.id);
  //     getGroupList();
  //   });
  //   return () => {
  //     socket.off("groupUpdate-", +currentUser.id);
  //   };
  // }, [socket]);

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
