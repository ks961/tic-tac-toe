import React, { useContext } from "react";

export type BoardConfigContextProps = {
    cellWidth: number,
    boardSize: number,
    cellHeight: number,
    boardWidth: number,
    boardHeight: number,
    setBoardConfig: <T extends BoardConfigContextPropsKeys>(key: T, value: BoardConfigContextProps[T]) => void;
}

export type BoardConfigContextPropsKeys = keyof BoardConfigContextProps;

export const BoardConfigContext = React.createContext<BoardConfigContextProps | null>(null);


export default function useBoardContext(): BoardConfigContextProps {
    const boardConfig = useContext(BoardConfigContext);

    if(!boardConfig) {
        throw new Error("useBoardContext should be called inside BoardContextProvider");
    }

    return boardConfig;
}