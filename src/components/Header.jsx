import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Avatar from "./Avatar";
import { IconDownArrow } from "../icons";
import useUtilStore from "../stores/utilStore";
import { SocketContext } from "../contexts/SocketContext";
import Profile from "./Profile";
import useFriendStore from "../stores/friendStore";
import MyProfile from "./MyProfile";

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

  useEffect(() => {
    // console.log(activePage);
    setActivePage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    socket.on("newChat-" + user.id, () => {
      socket.emit("identify", { userId: user.id });
      console.log("newChat-" + user.id);
    });
    return () => {
      socket.off("newChat-" + user.id);
    };
  }, [socket]);

  return (
    <>
      <div className="flex justify-between items-center bg-base-300 h-full">
        <nav>
          <ul className="flex gap-2 items-center">
            {/* <li>
            {activePage.includes("profile") ? (
              <a href="profile" className="font-bold">
                Profile
              </a>
            ) : (
              <a href="profile">Profile</a>
            )}
          </li> */}
            <li>
              {activePage.includes("chat") ? (
                <a href="/chat" className="font-bold">
                  Chat
                </a>
              ) : (
                <a href="/chat">Chat</a>
              )}
            </li>
            <li>
              {activePage.includes("friends") ? (
                <a href="/friends" className="font-bold">
                  Friends
                </a>
              ) : (
                <a href="/friends">Friends</a>
              )}
            </li>
            <li>
              {activePage.includes("groups") ? (
                <a href="/groups" className="font-bold">
                  Groups
                </a>
              ) : (
                <a href="/groups">Groups</a>
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
          {/* if there is a button in form, it will close the modal */}
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
          {/* if there is a button in form, it will close the modal */}
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
