import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import Avatar from "./Avatar";
import { IconEdit } from "../icons";
import MyProfileEdit from "./MyProfileEdit";
import useFriendStore from "../stores/friendStore";
import GroupDetailMember from "./GroupDetailMember";
import axios from "axios";
import { SocketContext } from "../contexts/SocketContext";
import GroupDetailEdit from "./GroupDetailEdit";

function GroupDetail(props) {
  const socket = useContext(SocketContext);
  const currentUser = useUserStore((state) => state.user);
  const activeGroup = useFriendStore((state) => state.activeGroup);
  const setActiveGroup = useFriendStore((state) => state.setActiveGroup);
  const token = useUserStore((state) => state.token);
  const [editMode, setEditMode] = useState(false);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [groupChatMembers, setGroupChatMembers] = useState([]);

  const getGroupChatMembers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/group/getgroupmembers/${activeGroup.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
      setGroupChatMembers(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingMembers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/group/getpendinggroupmembers/${activeGroup.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
      setPendingMembers(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const leaveGroup = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/group/leavegroup/${activeGroup.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const hdlLeaveGroup = async (e) => {
    const res = await leaveGroup();
    e.target.closest("#group-confirmLeave-modal").close();
    e.target.closest("#group-detail-modal").close();
    setActiveGroup(null);
  };

  useEffect(() => {
    getPendingMembers();
    getGroupChatMembers();
  }, [activeGroup]);

  useEffect(() => {
    socket.on("groupMemberUpdate-" + currentUser.id, (data) => {
      //   console.log(data);
      getPendingMembers();
      getGroupChatMembers();
      //   setGroupChatMembers(data.groupChatMembers);
    });
    return () => {
      socket.off("groupPendingMember-" + activeGroup.id);
    };
  }, [socket]);

  return editMode ? (
    <GroupDetailEdit setEditMode={setEditMode} />
  ) : (
    <>
      <div className="flex flex-col gap-2 items-center relative">
        <button
          className="btn btn-sm absolute left-0 pr-1"
          onClick={() => setEditMode(true)}
        >
          <p>Edit</p>
          <div className="w-7 h-7 p-1">
            <IconEdit />
          </div>
        </button>
        <div>
          <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
            <Avatar imgSrc={activeGroup.chatImage} />
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <h3 className="text-xl">{activeGroup.name}</h3>
        </div>
        <div className="flex gap-6 w-full px-2">
          <div className="flex-1 max-h-60 overflow-y-auto">
            <p>Members:</p>
            <div className="bg-gray-300 mt-1">
              {groupChatMembers.map((member) => (
                <GroupDetailMember key={member.user.id} user={member} />
              ))}
            </div>
          </div>
          <div className="flex-1 max-h-60 overflow-y-auto">
            <p>Pending:</p>
            <div className="bg-gray-300 mt-1">
              {pendingMembers.map((member) => (
                <GroupDetailMember key={member.user.id} user={member} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex mt-4 gap-4">
          <button className="btn btn-sm">Invite</button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => {
              const modal = document.getElementById("group-confirmLeave-modal");
              modal.showModal();
            }}
          >
            Leave
          </button>
        </div>
      </div>
      {/* confirm leave group modal */}
      <dialog id="group-confirmLeave-modal" className="modal mx-auto">
        <div className="modal-box rounded-md flex flex-col gap-2 items-center w-fit bg-slate-400">
          <h1>Do you want to leave this group?</h1>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-error" onClick={hdlLeaveGroup}>
              Confirm
            </button>
            <button
              className="btn btn-sm"
              onClick={(e) => {
                e.target.closest("#group-confirmLeave-modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default GroupDetail;
