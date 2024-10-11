import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import axios from "axios";
import FriendPendingItem from "./FriendPendingItem";

function FriendPending(props) {
  const { setMenuState } = props;
  const token = useUserStore((state) => state.token);
  const [friendPending, setFriendPending] = useState([]);

  const getFriendPending = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/user/getpendingrequest",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      setFriendPending(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendPending();
  }, []);

  return (
    <div className="flex flex-col items-start">
      <button onClick={() => setMenuState("friendList")}>Back</button>
      Friend Pending
      {friendPending.map((friend) => (
        <FriendPendingItem
          key={friend.id}
          friend={friend}
          getFriendPending={getFriendPending}
        />
      ))}
    </div>
  );
}

export default FriendPending;
