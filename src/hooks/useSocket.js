import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const useSocket = (roomId) => {
    const socketRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!roomId) return;

        const guestId = Math.floor(Math.random() * 1000);
        const username = user?.username || `Guest ${guestId}`;

        // Initialize socket connection
        socketRef.current = io(SOCKET_URL, {
            auth: {
                token: localStorage.getItem("token")
            }
        });

        // Join the room
        socketRef.current.emit("join-room", { 
            roomId, 
            username
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.emit("leave-room", { roomId, username });
                socketRef.current.disconnect();
            }
        };
    }, [roomId, user]);

    return socketRef.current;
};
