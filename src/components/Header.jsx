import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Avatar from "./Avatar";
import {
  IconDownArrow,
  IconMenuChat,
  IconMenuChatActive,
  IconMenuFriend,
  IconMenuFriendActive,
  IconMenuGroup,
  IconMenuGroupActive,
} from "../icons";
import useUtilStore from "../stores/utilStore";
import { SocketContext } from "../contexts/SocketContext";
import Profile from "./Profile";
import useFriendStore from "../stores/friendStore";
import MyProfile from "./MyProfile";
import notifySound from "../assets/sound/notify_sound.wav";
import useSound from "use-sound";

function Header() {
  const socket = useContext(SocketContext);
  const location = useLocation();
  const [activePage, setActivePage] = useState(
    location.pathname == "/" ? "chat" : location.pathname
  );
  const logout = useUserStore((state) => state.logout);
  const hdlLogout = () => {
    logout();
    socket.disconnect();
  };

  const user = useUserStore((state) => state.user);

  const setActiveProfile = useFriendStore((state) => state.setActiveProfile);
  const setChatNotify = useUtilStore((state) => state.setChatNotify);
  const chatNotify = useUtilStore((state) => state.chatNotify);

  const groupNotify = useUtilStore((state) => state.groupNotify);
  const setGroupNotify = useUtilStore((state) => state.setGroupNotify);

  const [playNotifySound] = useSound(notifySound, {
    interrupt: true,
  });

  useEffect(() => {
    // console.log(activePage);
    setActivePage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    socket.on("newChat-" + user.id, () => {
      socket.emit("identify", { userId: user.id });
      console.log("newChat-" + user.id);
    });
    socket.on("chatNotify-" + user.id, (data) => {
      // Create and resume AudioContext on user interaction
      const audioContext = new (window.AudioContext || window.AudioContext)();
      if (audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          playNotifySound();
        });
      } else {
        playNotifySound();
      }

      // console.log(data);
      // console.log(chatNotify);
      if (data.chatType === "PRIVATE") {
        setChatNotify([data, ...chatNotify]);
      }
      if (data.chatType === "GROUP") {
        setGroupNotify([data, ...groupNotify]);
      }
    });
    return () => {
      socket.off("newChat-" + user.id);
      socket.off("chatNotify-" + user.id);
    };
  }, [socket]);

  return (
    <>
      <div className="flex justify-between items-center bg-base-300 h-full">
        <nav className="px-4 h-full">
          <ul className="flex items-center w-full h-full">
            <li className="w-full h-full flex items-center">
              {activePage.includes("chat") ? (
                <a href="/chat" className="flex header-menu-active h-full px-4">
                  <IconMenuChatActive className="h-6" /> Chat{" "}
                  {chatNotify.length > 0 ? (
                    <span className="text-red-500">{chatNotify.length}</span>
                  ) : (
                    ""
                  )}
                </a>
              ) : (
                <a href="/chat" className="flex items-center h-full px-4">
                  <IconMenuChat className="h-[1.4rem]" /> Chat{" "}
                  {chatNotify.length > 0 ? (
                    <span className="text-red-500">{chatNotify.length}</span>
                  ) : (
                    ""
                  )}
                </a>
              )}
            </li>
            <li className="w-full h-full flex items-center">
              {activePage.includes("friends") ? (
                <a
                  href="/friends"
                  className="flex header-menu-active h-full px-4"
                >
                  <IconMenuFriendActive className="h-6" /> Friends
                </a>
              ) : (
                <a href="/friends" className="flex items-center h-full px-4">
                  <IconMenuFriend className="h-[1.4rem]" /> Friends
                </a>
              )}
            </li>
            <li className="w-full h-full flex items-center">
              {activePage.includes("groups") ? (
                <a
                  href="/groups"
                  className="flex header-menu-active h-full px-4"
                >
                  <IconMenuGroupActive className="h-7" /> Groups{" "}
                  {groupNotify.length > 0 ? (
                    <span className="text-red-500">{groupNotify.length}</span>
                  ) : (
                    ""
                  )}
                </a>
              ) : (
                <a href="/groups" className="flex items-center h-full px-4">
                  <IconMenuGroup className="h-[1.4rem]" /> Groups{" "}
                  {groupNotify.length > 0 ? (
                    <span className="text-red-500">{groupNotify.length}</span>
                  ) : (
                    ""
                  )}
                </a>
              )}
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="p-1 flex gap-2 items-center btn"
                >
                  <div className="bg-white rounded-full w-9 overflow-hidden">
                    <Avatar
                      imgSrc={user.profile.profileImage}
                      className="w-full"
                    />
                  </div>
                  {user.profile.name}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        const modal =
                          document.getElementById("myprofile-modal");
                        modal.showModal();
                      }}
                    >
                      My Profile
                    </p>
                  </li>
                  <li onClick={hdlLogout}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <dialog id="profile-modal" className="modal mx-auto">
        <div className="modal-box rounded-md bg-gray-400">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={(e) => {
              e.target.closest("#profile-modal").close();
              setActiveProfile(null);
            }}
          >
            ✕
          </button>
          <Profile />
        </div>
      </dialog>
      <dialog id="myprofile-modal" className="modal mx-auto">
        <div className="modal-box rounded-md bg-gray-400">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={(e) => {
              e.target.closest("#myprofile-modal").close();
            }}
          >
            ✕
          </button>
          <MyProfile />
        </div>
      </dialog>
    </>
  );
}

export default Header;
