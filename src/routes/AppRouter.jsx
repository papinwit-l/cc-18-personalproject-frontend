import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Layout from "../layouts/Layout";
import Chat from "../pages/Chat";
import Friends from "../pages/Friends";
import Group from "../pages/Group";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import useUserStore from "../stores/userStore";
import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";
import useUtilStore from "../stores/utilStore";
import axios from "axios";
// import socketIO from "socket.io-client";

// const socket = socketIO("http://localhost:8000");

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
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

function AppRouter() {
  const socket = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const token = useUserStore((state) => state.token);
  const finalRouter = user ? userRouter : guestRouter;
  const chatNotify = useUtilStore((state) => state.chatNotify);
  const setChatNotify = useUtilStore((state) => state.setChatNotify);

  // console.log(user);

  const testAuth = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getfriends", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      setChatNotify(privateChat);
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
