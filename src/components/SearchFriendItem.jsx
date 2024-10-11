import React, { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import axios from "axios";
import useUserStore from "../stores/userStore";
import { SocketContext } from "../contexts/SocketContext";

function SearchFriendItem(props) {
  const { user, findUser } = props;
  const socket = useContext(SocketContext);
  const token = useUserStore((state) => state.token);
  const currentUser = useUserStore((state) => state.user);
  const [status, setStatus] = useState(user?.friends[0]?.status || null);

  console.log(user);
  console.log(user?.friends[0]?.status);

  const hdlAddBtn = async (e) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/user/addfriend/${user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlRemoveRequest = async (e) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/user/removerequest/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      findUser();
    } catch (error) {
      console.log(error);
    }
  };

  const hdlAcceptRequest = async (e) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/user/acceptrequest/${user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("friendUpdate", (data) => {
      console.log("data");
      if (
        +data.result.userId == +currentUser.id &&
        +data.result.friendId == +user.id
      ) {
        console.log(data.result.status);
        setStatus(data.result.status);
      }
      if (
        +data.result2.userId == +currentUser.id &&
        +data.result2.friendId == +user.id
      ) {
        console.log(data.result2.status);
        setStatus(data.result2.status);
      }
    });
    return () => {
      socket.off("friendUpdate");
    };
  }, [socket]);

  return (
    <div className="flex flex-col gap-2 items-start justify-center p-2 bg-slate-300 border-[1px] hover:bg-slate-100">
      <div className="flex justify-between w-full">
        <div className="flex gap-2 items-center">
          <div className="w-7 h-7 p-1 bg-white rounded-full">
            <Avatar imgSrc={user.profile[0].profileImage} />
          </div>
          <p>
            {user.profile[0].name} {`id: ${user.id}`}
          </p>
        </div>
        {status === "REQUESTED" && (
          <button onClick={hdlRemoveRequest}>Cancel</button>
        )}

        {!status && (
          <button
            className="bg-slate-400 rounded-md p-1 hover:bg-slate-300"
            onClick={hdlAddBtn}
          >
            Add
          </button>
        )}
      </div>
      {status === "PENDING" && (
        <div className="flex gap-2 justify-around w-full">
          <button onClick={hdlAcceptRequest}>Accept</button>
          <button onClick={hdlRemoveRequest}>Reject</button>
        </div>
      )}
    </div>
  );
}

export default SearchFriendItem;
