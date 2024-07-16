import { GameSessionId, PlayerId } from "@/App.types";
import React, { useContext } from "react";


export type MultiPlayerSessionConfig = {
    boardSize: number,
    playerTurn: PlayerId,
    gameSessionId: GameSessionId,
    otherPlayerUsername: string,
}

export type MultiPlayerGameContextType = {
    mConfig: MultiPlayerSessionConfig,
    updateConfig: (newConfig: MultiPlayerSessionConfig) => void;
}

export const MultiPlayerGameContext = React.createContext<MultiPlayerGameContextType | null>(null);


export function useMultiPlayerContext() {
    const context = useContext(MultiPlayerGameContext);

    if(!context)
        throw new Error("useMultiPlayerContext must be used inside MultiPlayerGameContextProvider.");

    return context;
}
