import React from "react";
import Avatar from "./Avatar";

function GroupCreateFriendList(props) {
  const { role, friend: friendItem, setSelectedFriends, setFriendList } = props;
  const { user: friend } = friendItem;
  const { username: friendUserName, email: friendEmail } = friend;
  const {
    userId: friendId,
    name: friendName,
    profileImage,
  } = friend.Profile[0];
  //   console.log(friendItem);
  //   console.log(role);

  const handleInvite = (e) => {
    e.preventDefault();
    setSelectedFriends((prev) => [...prev, friendItem]);
    setFriendList((prev) => prev.filter((el) => el.userId !== friendId));
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setSelectedFriends((prev) => prev.filter((el) => el.userId !== friendId));
    setFriendList((prev) => [...prev, friendItem]);
  };

  return (
    <div className="flex items-center p-2 bg-gray-200 border-b border-white justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 p-1 bg-white rounded-full">
          <Avatar src={profileImage} />
        </div>
        <div>{friendName}</div>
      </div>
      {role == "FRIEND" && <button onClick={handleInvite}>Invite</button>}
      {role == "INVITED" && <button onClick={handleRemove}>Rem</button>}
    </div>
  );
}

export default GroupCreateFriendList;
