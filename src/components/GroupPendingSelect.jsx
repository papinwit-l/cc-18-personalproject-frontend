import React, { useEffect, useState } from "react";
import useFriendStore from "../stores/friendStore";
import GroupPendingSelectMember from "./GroupPendingSelectMember";
import axios from "axios";
import useUserStore from "../stores/userStore";

function GroupPendingSelect() {
  const activeGroupPending = useFriendStore(
    (state) => state.activeGroupPending
  );
  //   console.log(activeGroupPending);
  const groupId = activeGroupPending?.chatId;
  const chatName = activeGroupPending?.chat?.name;
  const chatImage = activeGroupPending?.chat?.chatImage;
  const ChatMembers = activeGroupPending?.chat?.ChatMembers;

  const [pendingMembers, setPendingMembers] = useState([]);
  const token = useUserStore((state) => state.token);
  //   console.log(token);

  const getPendingMember = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP +
          "/group/getpendinggroupmembers/" +
          groupId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setPendingMembers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeGroupPending) {
      getPendingMember();
    } else {
      setPendingMembers([]);
    }
  }, [activeGroupPending]);

  return (
    <div className="flex flex-col gap-2">
      <div>{chatName}</div>
      <div>
        <p>Member:</p>
        <div className="flex flex-col bg-slate-100 border-2 border-slate-300">
          {ChatMembers &&
            ChatMembers.map((el) => (
              <GroupPendingSelectMember key={el.user.id} member={el} />
            ))}
        </div>
        {pendingMembers && <p>Pending Member:</p>}
        {pendingMembers && (
          <div className="flex flex-col bg-slate-100 border-2 border-slate-300">
            {pendingMembers.map((el) => (
              <GroupPendingSelectMember key={el.id} member={el} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupPendingSelect;
