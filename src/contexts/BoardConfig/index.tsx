import { ReactNode, useMemo, useState } from "react";
import { BoardConfigContext, BoardConfigContextProps, BoardConfigContextPropsKeys } from "./BoardConfig";
import { boardHeight, boardSize, boardWidth, CellSize } from "@/config";


export type BoardConfigProviderProps = {
    children: ReactNode | ReactNode[],
}

export default function BoardConfigProvider({ children }: BoardConfigProviderProps) {
    const [ configState, setConfigState ] = useState<BoardConfigContextProps>({
        boardHeight,
        boardWidth,
        boardSize,
        cellWidth: CellSize.width,
        cellHeight: CellSize.height,
        setBoardConfig,
    });
 
    const configMemoized = useMemo(() => configState, [configState]);

    function setBoardConfig<T extends BoardConfigContextPropsKeys>(
        key: T, 
        value: BoardConfigContextProps[T]
    ) {
        setConfigState(prev => ({...prev, [key]: value}));
    }

    return(
        <BoardConfigContext.Provider value={configMemoized}>
            {children}
        </BoardConfigContext.Provider>
    );
}