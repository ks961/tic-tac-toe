import usePersistentState from "@/hooks/usePersistentState";
import { ReactNode, useEffect } from "react";
import { PlayerContext, PlayerInfo, UpdateCallbackType } from "./PlayerContext";
import { useAuth } from "../AuthContext/AuthContext";


export type PlayerContextProviderProps = {
    children: ReactNode | ReactNode[]
}


export default function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const { isAuthenticated } = useAuth();

    const [ playerInfo, setPlayerInfo, cleanup ] = usePersistentState<PlayerInfo>("playerInfo", {
        playerId: "",
        username: "",
    }, {deferredStore: true});


    useEffect(() => {
        if(isAuthenticated) return;
        
        cleanup();
    }, [isAuthenticated])

    function updatePlayerInfo(newPlayerInfo: PlayerInfo | UpdateCallbackType) {
        if(typeof newPlayerInfo === "function")
            newPlayerInfo = (newPlayerInfo as UpdateCallbackType)(playerInfo);

        setPlayerInfo(newPlayerInfo);
    }

    const context = {
        ...playerInfo,
        updatePlayerInfo,
    }

    return(
        <PlayerContext.Provider value={context}>
            {children}
        </PlayerContext.Provider>
    );
}