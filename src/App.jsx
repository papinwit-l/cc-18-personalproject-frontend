import AppRouter from "./routes/AppRouter";
import { SocketProvider } from "./contexts/SocketContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <SocketProvider>
      <AppRouter />
      <ToastContainer autoClose={1000} />
    </SocketProvider>
  );
}
