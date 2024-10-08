import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
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

const guestRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "*", element: <Navigate to={"/"} /> },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Chat /> },
      { path: "profile", element: <Profile /> },
      { path: "friends", element: <Friends /> },
      { path: "groups", element: <Group /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

function AppRouter() {
  const user = 1;
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}

export default AppRouter;
