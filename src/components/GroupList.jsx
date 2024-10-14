import React from "react";
import GroupCreate from "./GroupCreate";

function GroupList() {
  const showGroupCreateModal = (e) => {
    e.preventDefault();
    document.getElementById("group-create-modal").showModal();
  };

  return (
    <>
      <div className="bg-slate-400 h-full flex flex-col">
        <nav className="flex justify-end">
          <button onClick={showGroupCreateModal}>create group</button>
        </nav>
        <div>Group List</div>
      </div>
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

export default GroupList;
