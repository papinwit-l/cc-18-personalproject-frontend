import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import Avatar from "./Avatar";
import { IconEdit } from "../icons";
import MyProfileEdit from "./MyProfileEdit";

function MyProfile() {
  const currentUser = useUserStore((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  // console.log(currentUser);

  return editMode ? (
    <MyProfileEdit setEditMode={setEditMode} />
  ) : (
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
          <Avatar imgSrc={currentUser.profile.profileImage} />
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <h3 className="text-xl">{currentUser.profile.name}</h3>
      </div>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
}

export default MyProfile;
