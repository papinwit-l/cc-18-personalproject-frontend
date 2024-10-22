import React, { useContext, useEffect, useState } from "react";
import useFriendStore from "../stores/friendStore";
import GroupDetail from "./GroupDetail";
import { SocketContext } from "../contexts/SocketContext";
import useUserStore from "../stores/userStore";
import axios from "axios";

function GroupChatHeader() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const activeGroup = useFriendStore((state) => state.activeGroup);
  const setActiveGroup = useFriendStore((state) => state.setActiveGroup);
  const [groupChatMembers, setGroupChatMembers] = useState([]);
  const socket = useContext(SocketContext);

  // console.log(activeGroup);
  const getChatMembers = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP +
          "/group/getgroupmembers/" +
          activeGroup.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroupChatMembers(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatMembers();
  }, []);

  useEffect(() => {
    socket.on("groupActiveMemberUpdate-" + user.id, (data) => {
      getChatMembers();
    });
    socket.on("groupActiveUpdate-" + user.id, (data) => {
      // console.log(data);
      // console.log(activeGroup);
      setActiveGroup(data.updateGroup);
    });
    return () => {
      socket.off("groupActiveMemberUpdate-" + user.id);
      socket.off("groupActiveUpdate-" + user.id);
    };
  }, [socket]);

  return (
    <>
      <div className="bg-slate-200 h-[3rem] flex justify-between items-center px-2">
        <div className="flex gap-2 items-center h-full">
          <button
            className="btn btn-sm bg-black text-white"
            onClick={() => setActiveGroup(null)}
          >
            Back
          </button>
          <h1>
            {activeGroup.name} ({groupChatMembers.length})
          </h1>
        </div>
        <button
          onClick={() => {
            document.getElementById("group-detail-modal").showModal();
          }}
          className="btn btn-sm"
        >
          More
        </button>
      </div>
      <dialog id="group-detail-modal" className="modal mx-auto">
        <div className="modal-box rounded-md bg-gray-400">
          {/* if there is a button in form, it will close the modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={(e) => {
              e.target.closest("#group-detail-modal").close();
            }}
          >
            ✕
          </button>
          <GroupDetail />
        </div>
      </dialog>
    </>
  );
}

export default GroupChatHeader;
