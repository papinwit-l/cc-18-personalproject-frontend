import AppRouter from "./routes/AppRouter";
import { SocketProvider } from "./contexts/SocketContext";

export default function App() {
  return (
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  );
}
