import React, { useContext, useEffect, useState } from "react";
import GroupCreate from "./GroupCreate";
import { SocketContext } from "../contexts/SocketContext";
import useUserStore from "../stores/userStore";
import GroupList from "./GroupList";
import GroupPendingList from "./GroupPendingList";
import axios from "axios";
import useUtilStore from "../stores/utilStore";

function GroupBar() {
  const socket = useContext(SocketContext);
  const currentUser = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  const [toPendingg, setToPending] = useState(false);
  const setGroupPending = useUtilStore((state) => state.setGroupPending);

  const [groupList, setGroupList] = useState([]);

  const getPendingList = async () => {
    try {
      //   console.log("getPendingList");
      const res = await axios.get(
        "http://localhost:8000/group/getpendinglist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
      setGroupPending(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupList = async () => {
    try {
      // console.log("getGroupList");
      const res = await axios.get("http://localhost:8000/group/getgrouplist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res.data);
      const data = res.data.filter((el) => {
        return el.ChatMembers.some((el2) => el2.user.id === currentUser.id);
      });
      // console.log(data);
      setGroupList(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPendingList();
    getGroupList();
  }, []);

  useEffect(() => {
    socket.on("groupPendingMember-" + currentUser.id, (data) => {
      console.log(data);
      getPendingList();
    });
    socket.on("groupUpdate-" + currentUser.id, (data) => {
      console.log(data);
      getGroupList();
    });
    socket.on("groupMemberUpdate-" + currentUser.id, (data) => {
      console.log(data);
      getGroupList();
    });
    return () => {
      socket.off("groupPendingMember-" + currentUser.id);
      socket.off("groupUpdate-" + currentUser.id);
      socket.off("groupMemberUpdate-" + currentUser.id);
    };
  }, [socket]);

  return (
    <>
      {toPendingg ? (
        <GroupPendingList setToPending={setToPending} />
      ) : (
        <GroupList
          setToPending={setToPending}
          groupList={groupList}
          getGroupList={getGroupList}
        />
      )}

      <dialog id="group-create-modal" className="modal mx-auto">
        <div className="modal-box rounded-md bg-gray-400">
          {/* if there is a button in form, it will close the modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={(e) => {
              e.target.closest("#group-create-modal").close();
            }}
          >
            ✕
          </button>
          <GroupCreate />
        </div>
      </dialog>
    </>
  );
}

export default GroupBar;
