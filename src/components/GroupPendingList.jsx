import React from "react";
import useUtilStore from "../stores/utilStore";
import GroupPendingListItem from "./GroupPendingListItem";
import GroupPendingSelect from "./GroupPendingSelect";
import useFriendStore from "../stores/friendStore";

function GroupPendingList(props) {
  const { setToPending } = props;
  const groupPending = useUtilStore((state) => state.groupPending);
  const setActiveGroupPending = useFriendStore(
    (state) => state.setActiveGroupPending
  );

  return (
    <>
      <div className="bg-slate-400 h-full w-full flex flex-col">
        <nav className="flex justify-between items-center px-1 py-2">
          <button className="btn btn-sm" onClick={() => setToPending(false)}>
            Back
          </button>
        </nav>
        <p className="py-2 px-1 border-t border-b">Pending List:</p>
        <div className="flex-1 overflow-y-auto">
          {groupPending.map((el) => (
            <GroupPendingListItem key={el.id} group={el} />
          ))}
        </div>
      </div>
      <dialog id="group-pending-modal" className="modal mx-auto">
        <div className="modal-box rounded-md bg-gray-400">
          {/* if there is a button in form, it will close the modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={(e) => {
              setActiveGroupPending(null);
              e.target.closest("#group-pending-modal").close();
            }}
          >
            ✕
          </button>
          <GroupPendingSelect />
        </div>
      </dialog>
    </>
  );
}

export default GroupPendingList;
