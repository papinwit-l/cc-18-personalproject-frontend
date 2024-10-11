import React, { useState } from "react";
import SearchFriend from "./SearchFriend";
import FriendList from "./FriendList";
import FriendPending from "./FriendPending";

function FriendBar() {
  const [addFriend, setAddFriend] = useState(false);
  const [menuState, setMenuState] = useState("friendList");

  return (
    <div className="bg-slate-400 h-full">
      {menuState === "addFriend" && (
        <SearchFriend setMenuState={setMenuState} />
      )}
      {menuState === "friendList" && <FriendList setMenuState={setMenuState} />}
      {menuState === "friendPending" && (
        <FriendPending setMenuState={setMenuState} />
      )}
    </div>
  );
}

export default FriendBar;
