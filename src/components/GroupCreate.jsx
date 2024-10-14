import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import GroupCreateFriendList from "./GroupCreateFriendList";

function GroupCreate() {
  const token = useUserStore((state) => state.token);
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const getFriendList = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getfriends", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res.data);
      setFriendList(res.data);
      return res.data.friends;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold text-2xl text-center">Create Group</p>
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Group Name"
          className="input w-full h-10 border-[2px]] border-white bg-gray-200"
        />
        {/* invite friend */}
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-2">
            Friend List
            <div className="flex flex-col border bg-gray-300 h-48 overflow-y-auto">
              {friendList?.map((el) => (
                <GroupCreateFriendList
                  key={el.id}
                  role={"FRIEND"}
                  friend={el}
                  setFriendList={setFriendList}
                  setSelectedFriends={setSelectedFriends}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            Invited Friend
            <div className="flex flex-col border bg-gray-300 h-48 overflow-y-auto">
              {selectedFriends?.map((el) => (
                <GroupCreateFriendList
                  key={el.id}
                  role={"INVITED"}
                  friend={el}
                  setFriendList={setFriendList}
                  setSelectedFriends={setSelectedFriends}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="btn btn-primary mt-2">Create Group</button>
      </form>
    </div>
  );
}

export default GroupCreate;
