import React, { act, useContext, useEffect, useState } from "react";
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

  const activeGroup = useUtilStore((state) => state.activeGroup);
  const elevateGroupOnMsg = useUtilStore((state) => state.elevateGroupOnMsg);

  const getPendingList = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP + "/group/getpendinglist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroupPending(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupList = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP + "/group/getgrouplist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.map((el) => ({
        ...el,
        ChatMembers: el.ChatMembers.filter((el) => {
          return el.userId !== currentUser.id;
        }),
      }));
      setGroupList(data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPendingList();
    getGroupList();
  }, []);

  useEffect(() => {
    if (elevateGroupOnMsg) {
      setGroupList((prev) => {
        const newList = [...prev];
        const index = newList.findIndex((el) => el.id == elevateGroupOnMsg);
        if (index !== -1) {
          //move to the top
          newList.unshift(newList.splice(index, 1)[0]);
        }
        return newList;
      });
    }
  }, [elevateGroupOnMsg]);

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
    socket.on("chatGroupNotify-" + currentUser.id, (data) => {
      if (data.chatType === "GROUP") {
        setGroupList((prev) => {
          const newList = [...prev];
          const index = newList.findIndex((el) => el.id == data.chatId);
          if (index !== -1) {
            //move to the top
            newList.unshift(newList.splice(index, 1)[0]);
          }
          // console.log(newList);
          return newList;
        });
      }
    });
    return () => {
      socket.off("groupPendingMember-" + currentUser.id);
      socket.off("groupMemberUpdate-" + currentUser.id);
      socket.off("groupUpdate-" + currentUser.id);
      socket.off("chatGroupNotify-" + currentUser.id);
    };
  }, [socket, activeGroup]);

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
