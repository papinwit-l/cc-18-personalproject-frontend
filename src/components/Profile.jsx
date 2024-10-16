import React from "react";
import useFriendStore from "../stores/friendStore";
import Avatar from "./Avatar";

function Profile() {
  const activeProfile = useFriendStore((state) => state.activeProfile);
  // console.log(activeProfile);
  const user = activeProfile?.user;
  const userProfile = user?.Profile[0];
  // console.log(userProfile);

  return (
    activeProfile && (
      <div className="flex flex-col gap-2 items-center">
        <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
          <Avatar imgSrc={userProfile.profileImage} />
        </div>
        <h3 className="text-xl">{userProfile.name}</h3>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    )
  );
}

export default Profile;
