import { createContext, useContext } from "react"


export type PlayerInfo = {
    playerId: string,
    username: string,
    poolId?: string,
}

export type UpdateCallbackType = (prev: PlayerInfo) => PlayerInfo;

export type PlayerContextType = PlayerInfo & {
    updatePlayerInfo: (newPlayerInfo: PlayerInfo | UpdateCallbackType) => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);


export function usePlayerContext(): PlayerContextType {
    const context = useContext(PlayerContext);

    if(!context)
        throw new 
            Error("usePlayerContext Hook should be called inside PlayerContexProvider Component");

    return context;
}