import { useEffect, useState } from "react";
import { useSocket } from "@/contexts/SocketProvider";

const useSocketListener = (eventName: string) => {
  const socket = useSocket();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!socket) return;

    const handleEvent = (eventData: any) => {
      setData(eventData);
      console.log(`Event ${eventName} received:`, eventData);
    };

    socket.on(eventName, handleEvent);

    return () => {
      socket.off(eventName, handleEvent);
    };
  }, [socket, eventName]);

  return data;
};

export default useSocketListener;
