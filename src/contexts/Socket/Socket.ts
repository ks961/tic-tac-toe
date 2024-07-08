import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export type SocketContext = {
    socket: Socket | null
}

export const SocketContext = createContext<SocketContext | null>(null);

export function useSocket() {
    const socketContext = useContext(SocketContext);

    if(!socketContext) 
        throw new Error("useSocket should be use inside `SocketContextProvider`");

    return socketContext;
}