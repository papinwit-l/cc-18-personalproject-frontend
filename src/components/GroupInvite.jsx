import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import useFriendStore from "../stores/friendStore";
import GroupInviteList from "./GroupInviteList";
import { SocketContext } from "../contexts/SocketContext";

function GroupInvite(props) {
  const user = useUserStore((state) => state.user);
  const socket = useContext(SocketContext);
  const { pendingMembers, groupChatMembers } = props;
  const [friendList, setFriendList] = useState([]);
  const token = useUserStore((state) => state.token);
  const activeGroup = useFriendStore((state) => state.activeGroup);
  const [inviteList, setInviteList] = useState([]);
  const setActiveProfile = useFriendStore((state) => state.setActiveProfile);

  const getFriendList = async () => {
    try {
      const body = {
        groupId: activeGroup.id,
      };
      const res = await axios.post(
        import.meta.env.VITE_HOST_IP + "/group/getlistinvite",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
      setFriendList(res.data.groupInviteList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendList();
  }, [pendingMembers, groupChatMembers, activeGroup]);

  useEffect(() => {
    socket.on("groupInviteUpdate-" + user.id, (data) => {
      console.log(data);
      getFriendList();
      //   setInviteList((prev) => [...prev, data]);
    });
    return () => {
      socket.off("groupInviteUpdate-" + user.id);
    };
  }, [socket, activeGroup]);

  const hdlInvite = async (e) => {
    try {
      const body = {
        groupId: activeGroup.id,
        inviteList: inviteList,
      };
      //   console.log(body);
      const res = await axios.post(
        import.meta.env.VITE_HOST_IP + "/group/groupinvite",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    if (inviteList.length === 0) {
      e.target.closest("#group-invite-modal").close();
      return;
    }
    hdlInvite();
    //reset inviteList and close modal
    setInviteList([]);
    //set all input to unchecked
    const inputs = document.querySelectorAll("input[type='checkbox']");
    inputs.forEach((input) => {
      input.checked = false;
    });
    e.target.closest("#group-invite-modal").close();
  };

  const hdlToggle = (e) => {
    if (e.target.type !== "checkbox") {
      return;
    }
    // console.log(e.target.checked);
    // console.log(e.target.name);
    const data = { userId: Number(e.target.name), groupId: activeGroup.id };
    if (e.target.checked) {
      setInviteList((prev) => [...prev, data]);
    } else {
      setInviteList((prev) => prev.filter((el) => el.userId !== data.userId));
    }
  };

  const hdlCancel = (e) => {
    e.preventDefault();
    setInviteList([]);
    //set all input to unchecked
    const inputs = document.querySelectorAll("input[type='checkbox']");
    inputs.forEach((input) => {
      input.checked = false;
    });
    e.target.closest("#group-invite-modal").close();
  };

  const hdlViewProfile = (e) => {
    if (e.target.type === "checkbox") {
      return;
    }
    const user = JSON.parse(e.currentTarget.dataset.user);
    console.log(user);
    // set profile user to userId
    setActiveProfile(user);
    // //open profile modal
    document.getElementById("profile-modal").showModal();
  };

  return (
    <div className="flex flex-col w-fit min-w-52 gap-2">
      <p className="text-xl font-bold">Group Invite</p>
      <p>Friend List:</p>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <div className="flex flex-col">
          {friendList.map((el, idx) => (
            <div
              className="flex items-center gap-2 py-1 px-2 bg-gray-300 hover:bg-gray-200"
              onClick={hdlViewProfile}
              data-user={JSON.stringify(el)}
              key={idx}
            >
              <GroupInviteList friend={el} />
              <input
                type="checkbox"
                className="toggle toggle-success toggle-sm"
                onChange={hdlToggle}
                name={el.user.id}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-evenly">
          <button className="btn btn-sm" onClick={hdlSubmit}>
            Invite
          </button>
          <button className="btn btn-sm" onClick={hdlCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroupInvite;
