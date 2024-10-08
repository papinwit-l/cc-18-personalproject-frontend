import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [activePage, setActivePage] = useState(
    location.pathname.slice(1, location.pathname.length)
  );

  // useEffect(() => {
  //   console.log(activePage);
  //   console.log(location.pathname.slice(1, location.pathname.length));
  // }, []);

  return (
    <div className="flex justify-between items-center bg-base-300 h-full">
      <nav>
        <ul className="flex gap-2 items-center">
          <li>
            {activePage == "profile" ? (
              <a href="profile" className="font-bold">
                Profile
              </a>
            ) : (
              <a href="profile">Profile</a>
            )}
          </li>
          <li>
            {activePage == "" ? (
              <a href="/" className="font-bold">
                Chat
              </a>
            ) : (
              <a href="/">Chat</a>
            )}
          </li>
          <li>
            {activePage == "friends" ? (
              <a href="friends" className="font-bold">
                Friends
              </a>
            ) : (
              <a href="friends">Friends</a>
            )}
          </li>
          <li>
            {activePage == "groups" ? (
              <a href="groups" className="font-bold">
                Groups
              </a>
            ) : (
              <a href="groups">Groups</a>
            )}
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>Logout</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
