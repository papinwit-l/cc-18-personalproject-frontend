import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import FriendListItem from "./FriendListItem";

function FriendList(props) {
  const { setAddFriend } = props;
  const token = useUserStore((state) => state.token);

  const [friendList, setFriendList] = useState([]);
  const hdlAddFriend = (e) => {
    setAddFriend(true);
  };
  const fetchFriend = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getfriends", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      setFriendList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriend();
  }, []);

  return (
    <div>
      <button onClick={hdlAddFriend}>Add Friend</button>
      <div>FriendList</div>
      {friendList.map((el) => (
        <FriendListItem key={el.id} friend={el} />
      ))}
    </div>
  );
}

export default FriendList;
