import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import SearchFriendItem from "./SearchFriendItem";
import { SocketContext } from "../contexts/SocketContext";

function SearchFriend(props) {
  const { setAddFriend, setMenuState } = props;
  const socket = useContext(SocketContext);
  const token = useUserStore((state) => state.token);
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);

  const hdlBackBtn = (e) => {
    setMenuState("friendList");
  };

  const hdlChange = (e) => {
    setSearchText(e.target.value);
  };

  const findUser = async () => {
    try {
      setUserList([]);
      const res = await axios.get(
        `${import.meta.env.VITE_HOST_IP}/user/finduser/${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlFindUser = (e) => {
    e.preventDefault();
    // console.log(searchText);
    findUser();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="py-2 px-1">
        <button className="btn btn-sm" onClick={hdlBackBtn}>
          Back
        </button>
      </div>
      <form onSubmit={hdlFindUser}>
        <div className="flex gap-2 px-1 border-t border-b py-1">
          <input
            type="text"
            name="finduser"
            value={searchText}
            className="input input-sm flex-1"
            onChange={hdlChange}
          />
          <button className="btn btn-sm">Search</button>
        </div>
      </form>
      <div className="py-2 border-t border-b">Find other people:</div>
      <div className="flex-1 overflow-y-auto">
        {userList.map((el) => (
          <SearchFriendItem key={el.id} user={el} findUser={findUser} />
        ))}
      </div>
    </div>
  );
}

export default SearchFriend;
