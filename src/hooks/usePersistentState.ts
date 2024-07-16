import { useEffect, useRef, useState } from "react";

export type InitializerFunc<T> = () => T;

export type UpdateStateCallback<T> = (prev: T) => T;

export type UpdateState<T> = (newState: T | UpdateStateCallback<T>) => void;

export type CleaupStorage = () => void;

export type PersistentStateReturnType<T> = [ T, UpdateState<T>, CleaupStorage ];

export type ConfigType = {
    deferredStore: boolean
}

export default function usePersistentState<T>(
    key: string, 
    initialValue: T | InitializerFunc<T>, 
    config?: ConfigType
): PersistentStateReturnType<T> {

    const cleanupStateRef = useRef<boolean>(false);
    const deferredStoreRef = useRef<boolean>(config?.deferredStore || false);

    const [ state, setState ] = useState<T>(() => {
        
        try {            
            initialValue = JSON.parse(localStorage.getItem(key) ?? "");
        } catch(_) {
            if(typeof initialValue === "function")
                initialValue = (initialValue as InitializerFunc<T>)();
        } finally {
            return (initialValue as T);
        }
    });

    useEffect(() => {
        if(cleanupStateRef.current) {
            localStorage.removeItem(key);
            cleanupStateRef.current = false;
            return;
        }

        if(deferredStoreRef.current) return;
        
        localStorage.setItem(key, JSON.stringify(state));

        return () => {
            localStorage.removeItem(key);
        }

    }, [state]);

    function updateState(newState: T | UpdateStateCallback<T>) {
        if(deferredStoreRef.current) {
            deferredStoreRef.current = false;
        }
        
        if(typeof newState === "function")
            newState = (newState as UpdateStateCallback<T>)(state);

        setState(newState);
    }
    
    function cleanup() {
        cleanupStateRef.current = true;
        setState(initialValue);
    }

    return [ state, updateState, cleanup ];
}