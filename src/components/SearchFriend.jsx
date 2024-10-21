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
    <div>
      <button onClick={hdlBackBtn}>Back</button>
      <form onSubmit={hdlFindUser}>
        <input
          type="text"
          name="finduser"
          value={searchText}
          className="input"
          onChange={hdlChange}
        />
      </form>
      <div>Find other people</div>
      {userList.map((el) => (
        <SearchFriendItem key={el.id} user={el} findUser={findUser} />
      ))}
    </div>
  );
}

export default SearchFriend;
