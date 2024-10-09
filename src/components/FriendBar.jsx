import React, { useState } from "react";
import SearchFriend from "./SearchFriend";
import FriendList from "./FriendList";

function FriendBar() {
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className="bg-slate-400 h-full">
      {addFriend ? (
        <SearchFriend setAddFriend={setAddFriend} />
      ) : (
        <FriendList setAddFriend={setAddFriend} />
      )}
    </div>
  );
}

export default FriendBar;
