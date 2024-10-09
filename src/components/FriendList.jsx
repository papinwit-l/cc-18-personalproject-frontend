import React from "react";

function FriendList(props) {
  const { setAddFriend } = props;
  const hdlAddFriend = (e) => {
    setAddFriend(true);
  };
  return (
    <div>
      <button onClick={hdlAddFriend}>Add Friend</button>
      <div>FriendList</div>
    </div>
  );
}

export default FriendList;
