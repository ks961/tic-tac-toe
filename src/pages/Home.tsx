import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useSocket } from "@/contexts/Socket/Socket";
import { usePlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import { MultiPlayerSessionConfig, useMultiPlayerContext } from "@/contexts/MultiPlayerGameContext/MultiPlayerGameContext";
import Modal from "@/components/Modal/Modal";
import Text from "@/components/Text/Text";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import ConfigModal from "@/components/ConfigModal/ConfigModal";
import { getRandomInt } from "@/utils";
import useBoardContext from "@/contexts/BoardConfig/BoardConfig";


export type POOL_ID = {
    id: string
}

const enum GameRequestType {
    NONE = "none",
    SP = "singleplayer",
    MP = "multiplayer"
}

export default function Home() {
    
    const { socket } = useSocket();
    const { setBoardConfig } = useBoardContext();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { updateConfig, mConfig } = useMultiPlayerContext(); 
    const { username, playerId, updatePlayerInfo } = usePlayerContext();
    const [ waiting, setWaiting ] = useState<boolean>(false);

    const [ boardSize, setBoardSize ] = useState<number>(5);
    const [ showConfigModal, setShowConfigModal ] = useState<boolean>(false);
    const [ requestType, setRequestType ] = useState<GameRequestType>(GameRequestType.NONE); 
    


    useEffect(() => {
        if(socket === null || (!isAuthenticated)) return;
        
        if(!mConfig.gameSessionId) {
            socket?.emit("request-for-pool-connection", playerId);
        }

        socket?.on("pool-connection-success", (data) => {
            const poolId: POOL_ID = JSON.parse(data);

            updatePlayerInfo((prev) => ({...prev, poolId: poolId.id}));
        });

        socket?.on("game-config-data", (data) => {            
            const config: MultiPlayerSessionConfig = JSON.parse(data);            
            updateConfig(config);
        });

        return () => {
            socket.off("game-onfig-data");
            socket.off("pool-connection-success");
        }
    }, [socket, isAuthenticated]);

    useEffect(() => {
        if(!waiting) return;

        setWaiting(false);
        navigate(`/multiplayer/${mConfig.gameSessionId}`);
    }, [mConfig.gameSessionId]);

    useEffect(() => {
        if(requestType === GameRequestType.NONE) return;

        setShowConfigModal(true);
    }, [requestType])

    function handleSinglePlayerGameRequest() {
        setRequestType(GameRequestType.SP);
    }

    function handleMultiPlayerRequest() {
        setRequestType(GameRequestType.MP);
    }

    const handleBoardSizeInc = useCallback(() => {
        if(boardSize === 9) return;
        
        setBoardSize(prev => prev + 1);
    }, [boardSize]);
    
    const handleBoardSizeDec = useCallback(() => {
        if(boardSize === 3) return;

        setBoardSize(prev => prev - 1);
    }, [boardSize]);


    const handleModalConfig = useCallback(() => {
        setShowConfigModal(false);

        if(requestType === GameRequestType.SP) {
            setRequestType(GameRequestType.NONE);
            console.log("v", boardSize);
            
            setBoardConfig("boardSize", boardSize);
            navigate("/singleplayer", { replace: true });
            return;
        }

        setWaiting(true);
        socket?.emit("multiplayer-game-request", JSON.stringify({
            username,
            playerId,
            boardSize,
        }));
    }, [showConfigModal, waiting, boardSize]);

    const handleAny = useCallback(() => {
        if(requestType === GameRequestType.SP) {
            setBoardSize(getRandomInt(3, 9));
        } else {
            setBoardSize(0);
        }
        handleModalConfig();
    }, [showConfigModal, requestType]);

    const closeModal = useCallback(() => {
        setShowConfigModal(false);
    }, [showConfigModal])

    return(

        <div className="grid place-content-center h-full">
            <div className="flex items-center gap-4">
                <PrimaryButton as="button" onClick={handleSinglePlayerGameRequest} className="hover:scale-105 duration-200 transition-transform ease-in">
                    Single Player
                </PrimaryButton>
                <PrimaryButton as="button" onClick={handleMultiPlayerRequest} className="hover:scale-105 duration-200 transition-transform ease-in">
                    MultiPlayer
                </PrimaryButton>
            </div>
            <Modal toShow={waiting} className="px-4 py-2">
                <Text as="h4">Matching...</Text>
            </Modal>
            <ConfigModal 
                boardSize={boardSize} 
                handleAny={handleAny}
                closeModal={closeModal}
                modalShow={showConfigModal}
                incSize={handleBoardSizeInc} 
                decSize={handleBoardSizeDec} 
                toggleModal={handleModalConfig} 
            />
        </div>
    );
}