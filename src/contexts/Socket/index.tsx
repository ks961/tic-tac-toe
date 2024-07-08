import { ReactNode, useLayoutEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { SocketContext } from "./Socket";



export type SocketContextProviderProps = {
    children: ReactNode | ReactNode[],
}

export function SocketContextProvider({ children }: SocketContextProviderProps) {
    const [ socket, setSocket ] = useState<Socket | null>(null);

    useLayoutEffect(() => {
        const socket = io("ws://127.0.0.1:3000")
        setSocket(socket);
        
        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}