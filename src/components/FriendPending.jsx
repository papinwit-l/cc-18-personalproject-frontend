import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import axios from "axios";
import FriendPendingItem from "./FriendPendingItem";
import { SocketContext } from "../contexts/SocketContext";

function FriendPending(props) {
  const socket = useContext(SocketContext);
  const currentUser = useUserStore((state) => state.user);
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

  useEffect(() => {
    console.log("aaaaa");
    socket.on("friendUpdate-" + currentUser.id, (data) => {
      console.log("friendUpdate", data);
      if (
        +data.result.userId == +currentUser.id ||
        +data.result.friendId == +currentUser.id
      ) {
        // console.log(data.result.status);
        getFriendPending();
      }
    });
    return () => {
      socket.off("friendUpdate-" + currentUser.id);
    };
  }, [socket]);

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
