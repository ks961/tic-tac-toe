import usePersistentState from "@/hooks/usePersistentState";
import { MultiPlayerGameContext, MultiPlayerGameContextType, MultiPlayerSessionConfig } from "./MultiPlayerGameContext";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";

export type MultiPlayerGameContextProviderProps = {
    children: ReactNode | ReactNode[],
}

export default function MultiPlayerGameContextProvider({ children }: MultiPlayerGameContextProviderProps) {

    const { isAuthenticated } = useAuth();

    const [ state, setState, cleanup ] = usePersistentState<MultiPlayerSessionConfig>("mgctx", {
        boardSize: 0,
        playerTurn: "",
        gameSessionId: "",
        otherPlayerUsername: "",
    }, { deferredStore: true});


    useEffect(() => {
        if(isAuthenticated) return;
        cleanup();
    }, [isAuthenticated])

    function updateMultiPlayerConfig(newConfig: MultiPlayerSessionConfig) {       
        setState(newConfig);
    }

    const context: MultiPlayerGameContextType = {
        mConfig: state,
        updateConfig: updateMultiPlayerConfig
    }

    return(
        <MultiPlayerGameContext.Provider value={context}>
            {children}
        </MultiPlayerGameContext.Provider>
    );
}