import { useEffect } from "react";
import socket from "../socket/socket";
import useAuthStore from "../store/authStore";

export const useSocket = () => {
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    socket.emit("join", user._id);

    socket.on("notification", (data) => {
      console.log("🔔", data);
    });

    return () => {
      socket.off("notification");
    };
  }, [user]);
};
