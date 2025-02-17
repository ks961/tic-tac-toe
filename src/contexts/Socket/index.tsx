import { ReactNode, useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"
import { SocketContext } from "./Socket";
import { useAuth } from "../AuthContext/AuthContext";
import { backendDomain } from "@/config";



export type SocketContextProviderProps = {
    children: ReactNode | ReactNode[],
}

export function SocketContextProvider({ children }: SocketContextProviderProps) {

    const { isAuthenticated } = useAuth();

    const [ socketState, setSocketState ] = useState<SocketContext>({
        socket: null,
        isConnected: false
    });

    const memoizedSocket = useMemo(() => socketState, [socketState]); 

    useEffect(() => {
        if(socketState.isConnected || !isAuthenticated) return;
        
        const socket = io(`ws://${backendDomain}`);
        
        socket.on("connect", () => {

            setSocketState({
                socket,
                isConnected: true,
            });
        });

        socket.on("disconnect", () => {
            setSocketState({
                socket: null,
                isConnected: false,
            });
        });
        
        return () => {
            socket.disconnect();
        }
    }, [isAuthenticated]);

    return (
        <SocketContext.Provider value={memoizedSocket}>
            {children}
        </SocketContext.Provider>
    )
}