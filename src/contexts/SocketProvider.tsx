import { createContext, useContext, useEffect, useState } from "react";
import { socketURL } from "@/utils/endPoint";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { selectUserId } from "@/redux/slices/auth/authSlices";

// Tạo context cho socket
const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const id = useSelector(selectUserId);

  useEffect(() => {
    console.log(id);

    if (id) {
      const newSocket = io(socketURL);
      setSocket(newSocket);

      const stringId = String(id);
      const data: { room_id: string } = { room_id: stringId };
      console.log(data);
      newSocket.on("connect", () => {
        newSocket.emit("subscribe", data);
        console.log(`Connected with room_id: ${id}`);
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected");
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [id]);

  return (
    <SocketContext.Provider value={socket}> {children}</SocketContext.Provider>
  );
};
