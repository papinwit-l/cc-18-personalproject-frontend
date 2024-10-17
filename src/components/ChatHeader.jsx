import React from "react";
import useFriendStore from "../stores/friendStore";
import useUserStore from "../stores/userStore";

function ChatHeader() {
  const currentUser = useUserStore((state) => state.user);
  const activeChat = useFriendStore((state) => state.activeChat);
  const setActiveChat = useFriendStore((state) => state.setActiveChat);
  const setActiveProfile = useFriendStore((state) => state.setActiveProfile);
  // console.log(activeChat);
  const friendProfile =
    activeChat.ChatMembers[0].user.id == currentUser.id
      ? activeChat.ChatMembers[1]
      : activeChat.ChatMembers[0];
  const friend =
    activeChat.ChatMembers[0].user.id == currentUser.id
      ? activeChat.ChatMembers[1].user
      : activeChat.ChatMembers[0].user;
  // console.log(friend);
  return (
    <div className="bg-slate-200 h-[3rem] flex justify-between items-center px-2">
      <div className="flex gap-2 items-center h-full">
        <button
          className="btn btn-sm bg-black text-white"
          onClick={() => setActiveChat(null)}
        >
          Back
        </button>
        <h1>{friend.Profile[0].name}</h1>
      </div>
      <button
        className="btn btn-sm"
        onClick={() => {
          setActiveProfile(friendProfile);
          const modal = document.getElementById("profile-modal");
          modal.showModal();
        }}
      >
        View Profile
      </button>
    </div>
  );
}

export default ChatHeader;
