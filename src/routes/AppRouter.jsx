import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layouts/Layout";
import Chat from "../pages/Chat";
import Friends from "../pages/Friends";
import Group from "../pages/Group";
import useUserStore from "../stores/userStore";
import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";
import useUtilStore from "../stores/utilStore";
import axios from "axios";
// import socketIO from "socket.io-client";

// const socket = socketIO(import.meta.env.VITE_HOST_IP+"");

const guestRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "*", element: <Navigate to={"/"} /> },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={"chat"} /> },
      { path: "chat", element: <Chat /> },
      { path: "friends", element: <Friends /> },
      { path: "groups", element: <Group /> },
      { path: "*", element: <Navigate to={"chat"} /> },
    ],
  },
]);

function AppRouter() {
  const socket = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const token = useUserStore((state) => state.token);
  const finalRouter = user ? userRouter : guestRouter;
  const setChatNotify = useUtilStore((state) => state.setChatNotify);
  const setGroupNotify = useUtilStore((state) => state.setGroupNotify);

  // console.log(user);

  const testAuth = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_HOST_IP + "/user/getfriends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  useEffect(() => {
    if (!user) return;
    socket.on("connect", () => {
      testAuth();
      console.log("socket connected", socket.id);
      socket.emit("identify", { userId: user.id });
      socket.emit("getChatNotify", { userId: user.id });
    });
    // socket.emit("identify", { userId: user.id });
    socket.on("joined_room", ({ room }) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("receiveChatNotify-" + user.id, (data) => {
      console.log(data);
      const privateChat = data.filter((el) => el.chatType === "PRIVATE");
      const groupChat = data.filter((el) => el.chatType === "GROUP");
      setChatNotify(privateChat);
      setGroupNotify(groupChat);
    });

    return () => {
      socket.off("connect");
      socket.off("joined_room");
      socket.off("receiveChatNotify-" + user.id);
    };
  }, [user, socket]);

  return <RouterProvider router={finalRouter} />;
}

export default AppRouter;
