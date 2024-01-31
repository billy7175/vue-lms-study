import { io } from "socket.io-client";

const useSocketIO = () => {
    const socket = io("http://127.0.0.1:3000", {
      transports: ["websocket"],
    });
    return {
      socket,
    };
  };

export default useSocketIO;