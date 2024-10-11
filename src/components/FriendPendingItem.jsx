import React, { useContext, useEffect } from "react";
import Avatar from "./Avatar";
import axios from "axios";
import useUserStore from "../stores/userStore";
import { SocketContext } from "../contexts/SocketContext";

function FriendPendingItem(props) {
  const { friend, getFriendPending } = props;
  const socket = useContext(SocketContext);
  const currentUser = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  // console.log(friend);

  const hdlRemoveRequest = async (e) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/user/removerequest/${friend.friendId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      getFriendPending();
    } catch (error) {
      console.log(error);
    }
  };

  const hdlAcceptRequest = async (e) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/user/acceptrequest/${friend.friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      getFriendPending();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("friendUpdate", (data) => {
      // console.log("data");
      if (
        +data.result.userId == +currentUser.id &&
        +data.result.friendId == +friend.friendId
      ) {
        // console.log(data.result.status);
        getFriendPending();
      }
      if (
        +data.result2.userId == +currentUser.id &&
        +data.result2.friendId == +friend.friendId
      ) {
        // console.log(data.result2.status);
        getFriendPending();
      }
    });
    // Cleanup on component unmount
    // return () => {
    //   socket.off("friendUpdate");
    // };
  }, [socket]);

  return (
    friend.status == "PENDING" && (
      <div className="flex w-full flex-col gap-2 items-start justify-center p-2 bg-slate-300 border-[1px] hover:bg-slate-100">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 p-1 bg-white rounded-full">
              <Avatar imgSrc={friend.friend.Profile[0].profileImage} />
            </div>
            <p>
              {friend.friend.Profile[0].name} {`id: ${friend.friendId}`}
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-around w-full">
          <button onClick={hdlAcceptRequest}>Accept</button>
          <button onClick={hdlRemoveRequest}>Reject</button>
        </div>
      </div>
    )
  );
}

export default FriendPendingItem;
