import { useEffect, useState } from "react";
import { useSocket } from "../contexts/Socket/Socket";

type UpdateStateCallback<T> = (prev: T) => T;

type UpdateState<T> = (newState: T) => void;

export type UpdateConfirmed<T> = {
    wasSuccess: boolean,
    value: T,
}

export type SocketStateReturnType<T> = [ T, UpdateState<T> ];

export default function useSocketState<T>(event: string): SocketStateReturnType<T> {
    const { socket } = useSocket();
    
    const [ state, setState ] = useState<T>();

    function handleSocketIncoming(data: string) {
        const json: T = JSON.parse(data);
        setState(json);
    }

    function updateState(newState: T | UpdateStateCallback<T>) {
        if(typeof newState === "function" && state)
            newState = (newState as UpdateStateCallback<T>)(state);
        socket?.emit(`${event}-update`, JSON.stringify(newState));
    }

    function handleStateUpdateConfirmed(data: string) {
        const updateState: UpdateConfirmed<T> = JSON.parse(data);
        if(updateState.wasSuccess) setState(updateState.value);
    }

    useEffect(() => {
        socket?.on(event, handleSocketIncoming);
        socket?.on(`${event}-update-confirmed`, handleStateUpdateConfirmed)
        
        return () => {
            socket?.off(event, handleSocketIncoming)
            socket?.off(`${event}-update-confirmed`, handleStateUpdateConfirmed)
        }
    }, [socket]);


    return [ state as T, updateState ];
}