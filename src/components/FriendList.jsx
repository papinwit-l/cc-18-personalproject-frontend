import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import FriendListItem from "./FriendListItem";
import { SocketContext } from "../contexts/SocketContext";

function FriendList(props) {
  const { setMenuState } = props;
  const token = useUserStore((state) => state.token);
  const currentUser = useUserStore((state) => state.user);
  const socket = useContext(SocketContext);

  const [friendList, setFriendList] = useState([]);
  const hdlAddFriend = (e) => {
    setMenuState("addFriend");
  };
  const fetchFriend = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP + "/user/getfriends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      setFriendList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriend();
  }, []);

  useEffect(() => {
    socket.on("friendUpdate-" + currentUser.id, (data) => {
      fetchFriend();
    });
    return () => {
      socket.off("friendUpdate-" + currentUser.id);
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between py-2 px-1">
        <button className="btn btn-sm" onClick={hdlAddFriend}>
          Add Friend
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setMenuState("friendPending")}
        >
          Pending
        </button>
      </div>
      <div className="py-2 px-1 border-t border-b">Friend List:</div>
      <div className="flex-1 overflow-y-auto h-full">
        {friendList.map((el) => (
          <FriendListItem key={el.id} friend={el} />
        ))}
      </div>
    </div>
  );
}

export default FriendList;
