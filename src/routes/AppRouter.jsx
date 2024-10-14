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
import Profile from "../pages/Profile";
import Friends from "../pages/Friends";
import Group from "../pages/Group";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import useUserStore from "../stores/userStore";
import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";
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
      { path: "profile", element: <Profile /> },
      { path: "friends", element: <Friends /> },
      { path: "groups", element: <Group /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

function AppRouter() {
  const socket = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;

  // console.log(user);

  useEffect(() => {
    if (!user) return;
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });
    socket.emit("identify", { userId: user.id });
    socket.on("joined_room", ({ room }) => {
      console.log(`Joined room: ${room}`);
    });
    socket.on("test", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("connect");
      socket.off("joined_room");
    };
  }, [user]);

  return <RouterProvider router={finalRouter} />;
}

export default AppRouter;
