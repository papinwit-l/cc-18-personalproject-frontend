import axios from "axios";
import React, { useState } from "react";
import useUserStore from "../stores/userStore";

function SearchFriend(props) {
  const { setAddFriend } = props;
  const token = useUserStore((state) => state.token);
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);

  const hdlBackBtn = (e) => {
    setAddFriend(false);
  };

  const hdlChange = (e) => {
    setSearchText(e.target.value);
  };

  const findUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/finduser/${searchText}`,
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
    console.log(searchText);
    findUser(searchText);
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
      <div>Friend List</div>
      {userList.map((el) => {
        return <div key={el.id}>{el.username}</div>;
      })}
    </div>
  );
}

export default SearchFriend;
