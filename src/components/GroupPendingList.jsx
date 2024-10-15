import React from "react";
import useUtilStore from "../stores/utilStore";
import GroupPendingListItem from "./GroupPendingListItem";

function GroupPendingList(props) {
  const { setToPending } = props;
  const groupPending = useUtilStore((state) => state.groupPending);

  return (
    <div className="bg-slate-400 h-full w-full flex flex-col">
      <nav className="flex justify-between items-center p-2">
        <button onClick={() => setToPending(false)}>Back</button>
      </nav>
      <p className="py-2">Pending List:</p>
      {groupPending.map((el) => (
        <GroupPendingListItem key={el.id} group={el} />
      ))}
    </div>
  );
}

export default GroupPendingList;
