import { boardSize } from "@/config";
import Board from "@/components/Board/Board";
import { EPLAY_ITEM, BoardUpdate, PlayerWon } from "@/App.types";
import usePersistentState from "@/hooks/usePersistentState";
import { MultiPlayerSessionConfig, useMultiPlayerContext } from "@/contexts/MultiPlayerGameContext/MultiPlayerGameContext";
import { generateBoardNxN } from "@/utils";
import { useCallback, useEffect, useMemo } from "react";
import { useSocket } from "@/contexts/Socket/Socket";
import Text from "@/components/Text/Text";
import { usePlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal/Modal";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";


export default function MultiPlayer() {

    const navigate = useNavigate();
    
    const { socket } = useSocket();
    const { username, playerId } = usePlayerContext();
    const { mConfig, updateConfig } = useMultiPlayerContext();

    const [ modalData, setModalData ] = usePersistentState<string>("mModalData", "");
    const [ isMyTurn, setIsMyTurn ] = usePersistentState<boolean>("mPlayerTurn", false);
    const [ boardState, setBoardState ] = usePersistentState<EPLAY_ITEM[][]>("mBoard", [], { deferredStore: true});

    const board = useMemo(() => boardState, [boardState]);

    useEffect(() => {
                
        setIsMyTurn(mConfig.playerTurn === playerId);
        setBoardState(generateBoardNxN(mConfig.boardSize));
    }, []);

    // useEffect(() => {
    //     if(!isConnected) return;

    //     console.log(isConnected);
        
    //     socket!.emit("game-session-re-connect", JSON.stringify({
    //         gameSessionId: mConfig.gameSessionId,
    //         otherPlayerUsername: mConfig.otherPlayerUsername,
    //         playerId,
    //     }));

    // }, [isConnected])

    
    useEffect(() => {

        socket?.on("board-update", (data) => {
            const boardUpdate: BoardUpdate = JSON.parse(data);
            
            setIsMyTurn(playerId === boardUpdate.playerTurn);
            setBoardState(prevBoard => {
                return prevBoard.map((rows, rowIdx) => (boardUpdate.coords.x === rowIdx) ?
                rows.map((col, colIdx) => (boardUpdate.coords.y === colIdx) ? boardUpdate.playItem : col) : rows)
            });
        });

        socket?.on("player-won", (data) => {
            const player: PlayerWon = JSON.parse(data);
            const winnerUsername = (player.playerId === playerId) ? username : mConfig.otherPlayerUsername;
            setModalData(`Player ${winnerUsername.toUpperCase()} won!`);
        });
        
        socket?.on("game-draw", () => {
            setModalData(`Game Draw`);
        });

        // socket?.io.on("reconnect", () => {
        //     socket.emit("game-session-re-connect", JSON.stringify({
        //         gameSessionId: mConfig.gameSessionId,
        //         otherPlayerUsername: mConfig.otherPlayerUsername,
        //         playerId,
        //     }));
        // });

        socket?.on("re-game-config-data", (data) => {
            const config: MultiPlayerSessionConfig = JSON.parse(data);            
            updateConfig(config);
        })
        
        return () => {
            socket?.off("game-draw");
            socket?.off("player-won");
            socket?.off("board-update");
            socket?.off("re-game-config-data");
        }

    }, [boardState]);

    const handleCellClick = useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
        if(!isMyTurn) return;

        const element = event.target;
  
        if(!(element instanceof HTMLSpanElement)) return;

        const rowElementIdx = parseInt(element.dataset['row'] ?? "");
        const colElementIdx = parseInt(element.dataset['col'] ?? "");

        if(isNaN(rowElementIdx) || isNaN(colElementIdx)) {
            throw new Error("Row or Col index fail to read.");
        }

        socket?.emit("board-update", JSON.stringify({
            playerId,
            gameSessionId: mConfig.gameSessionId,
            coords: {
                x: rowElementIdx,
                y: colElementIdx,
            }
        }));
    }, [board]);

    const closeModal = useCallback(() => {
        setModalData("");
        navigate("/", { replace: true });
    }, []);

    return(
        <div className="w-full h-full flex flex-col justify-center mt-16 px-16">
            <div className="w-full h-full flex justify-between items-start">
                <Text as="h2" className={`w-1/5 ${isMyTurn ? "text-primary text-2xl" : ""}`} title={username}>
                    {username.length > 8 ? `${username.substring(0, 8)}...` : username}
                </Text>
                <Board board={board} boardSize={boardSize} handleCellClick={handleCellClick} />
                <Text as="h2" className={`w-1/5 ${!(isMyTurn) ? "text-primary text-2xl" : ""}`} title={mConfig.otherPlayerUsername}>
                    {mConfig.otherPlayerUsername.length > 8 ? `${mConfig.otherPlayerUsername.substring(0, 8)}...` : mConfig.otherPlayerUsername}
                </Text>
            </div>
            <Modal toShow={modalData ? true : false} toggleModal={closeModal}>
                <div className="w-[300px] h-[250px] grid place-content-center">
                    <div className="flex flex-col items-center gap-8">
                        <Text as="h3">{modalData}</Text>
                        <PrimaryButton as="button" onClick={closeModal}>Close</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}