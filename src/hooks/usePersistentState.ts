import { useEffect, useState } from "react";

export type InitializerFunc<T> = () => T;

export type UpdateStateCallback<T> = (prev: T) => T;

export type UpdateState<T> = (newState: T | UpdateStateCallback<T>) => void;

export type PersistentStateReturnType<T> = [ T, UpdateState<T> ];

export type ConfigType = {
    deferredStore: boolean
}

export default function usePersistentState<T>(
    key: string, 
    initialValue: T | InitializerFunc<T>, 
    config?: ConfigType
): PersistentStateReturnType<T> {
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
        if(config?.deferredStore) return;
        
        localStorage.setItem(key, JSON.stringify(state));

    }, [state]);

    function updateState(newState: T | UpdateStateCallback<T>) {
        if(config?.deferredStore) {
            config.deferredStore = false;
        }
        
        if(typeof newState === "function")
            newState = (newState as UpdateStateCallback<T>)(state);

        setState(newState);
    }

    return [ state, updateState ];
}