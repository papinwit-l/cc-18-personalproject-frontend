import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Avatar from "./Avatar";
import { IconDownArrow } from "../icons";
import useUtilStore from "../stores/utilStore";

function Header() {
  const location = useLocation();
  const [activePage, setActivePage] = useState(
    location.pathname == "/" ? "chat" : location.pathname
  );
  const logout = useUserStore((state) => state.logout);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    console.log(activePage);
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
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
                <div className="bg-white rounded-full p-1 w-9">
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
                  <a href="/profile">My Profile</a>
                </li>
                <li onClick={logout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
