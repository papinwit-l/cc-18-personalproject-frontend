import React from "react";
import Avatar from "./Avatar";
import useFriendStore from "../stores/friendStore";

function GroupDetailMember(props) {
  const { user } = props.user;
  const { user: User } = props;
  const setActiveProfile = useFriendStore((state) => state.setActiveProfile);
  //   console.log(user);
  return (
    <div
      className="flex gap-2 items-center p-2 hover:bg-gray-200"
      onClick={() => {
        setActiveProfile(User);
        const modal = document.getElementById("profile-modal");
        modal.showModal();
      }}
    >
      <div className="w-7 h-7 rounded-full bg-white overflow-hidden">
        <Avatar imgSrc={user.Profile[0].profileImage} />
      </div>
      <p>{user.Profile[0].name}</p>
    </div>
  );
}

export default GroupDetailMember;
