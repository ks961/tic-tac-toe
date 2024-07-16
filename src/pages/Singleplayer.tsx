import { generateBoardNxN } from "@/utils";
import { useEffect, useCallback, useMemo } from "react";
import { EGAME_RESULT, EGAME_STATE, EPLAY_ITEM } from "@/App.types";
import Text from "@/components/Text/Text";
import useBoardContext from "@/contexts/BoardConfig/BoardConfig";
import usePersistentState from "@/hooks/usePersistentState";
import Board from "@/components/Board/Board";
import Modal from "@/components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";


let renderCount = 0;
export default function SinglePlayer() {

    const { boardSize } = useBoardContext();

    const navigate = useNavigate();
  
    const [ board, setBoard ] = usePersistentState<EPLAY_ITEM[][]>("board", () => generateBoardNxN(boardSize));
    const [ modalShow, setModalShow ] = usePersistentState<boolean>("modalShow", false);
    const [ modalData, setModalData ] = usePersistentState<string>("modalData", "");
    const [ playerWon, setPlayerWon ] = usePersistentState<EPLAY_ITEM>("playerWon", EPLAY_ITEM.EMPTY);
    const [ gameState, setGameState ] = usePersistentState<EGAME_STATE>("gameState", EGAME_STATE.START);
    const [ playerTurn, setPlayerTurn ] = usePersistentState<EPLAY_ITEM>("playerTurn", EPLAY_ITEM.CHECK);

    const memoizedBoard = useMemo(() => board, [board]);

    useEffect(() => {
      if(gameState ===  EGAME_STATE.PLAYING) return;
      
      if(memoizedBoard.length === boardSize) return;
      
      setBoard(generateBoardNxN(boardSize));
      
    }, [boardSize]);
  
    const handleCellClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      const element = event.target;
  
      if(!(element instanceof HTMLSpanElement)) return;
  
      if(gameState !== EGAME_STATE.PLAYING) setGameState(EGAME_STATE.PLAYING);
  
      const playItem = element.dataset['item'];
      const rowElementIdx = parseInt(element.dataset['row'] ?? "");
      const colElementIdx = parseInt(element.dataset['col'] ?? "");
  
      if(!playItem || isNaN(rowElementIdx) || isNaN(colElementIdx)) return; // throw error
  
      if(playItem !== EPLAY_ITEM.EMPTY) return;
  
      handleEmptyCell(rowElementIdx, colElementIdx);
    }, [board, playerTurn]);
  
    function handleEmptyCell(rowElementIdx: number, colElementIdx: number) {
        setBoard(prevBoard => {
            return prevBoard.map((rows, rowIdx) => (rowElementIdx === rowIdx) ?
            rows.map((col, colIdx) => (colElementIdx === colIdx) ? playerTurn : col) : rows)
        });
    }
  
    function evaluateBoard(): EGAME_RESULT {
  
      /* All rows evaluation */
      for(const rows of board) {
        const rowAsSet = new Set(rows);
        if(rowAsSet.size === 1 && !(rowAsSet.has(EPLAY_ITEM.EMPTY))) return EGAME_RESULT.WON;
      }      
      
      /* Diagonals evaluation */
      const diagSet = new Set();
      const crossDiagSet = new Set();
      for(let i = 0; i < memoizedBoard.length; i++) {
        diagSet.add(board[i][i]);
        crossDiagSet.add(board[i][(boardSize - i) - 1]);
      }
  
      if((diagSet.size === 1 && !(diagSet.has(EPLAY_ITEM.EMPTY))) || 
        (crossDiagSet.size === 1 && !(crossDiagSet.has(EPLAY_ITEM.EMPTY)))) return EGAME_RESULT.WON;
  
      /* All cols evaluation */
      const cols = new Set();
      for(let col = 0; col < boardSize; col++) {
        for(let row = 0; row < boardSize; row++) {
          cols.add(board[row][col]);
        }
        if(cols.size === 1 && !(cols.has(EPLAY_ITEM.EMPTY))) return EGAME_RESULT.WON;
        cols.clear();
      }

      const filteredBoard = board.flatMap(rows => rows.filter(row => row === EPLAY_ITEM.EMPTY));
  
      return filteredBoard.length === 0 ? EGAME_RESULT.DRAW : EGAME_RESULT.NONE;
    }
  
    function gameReset() {
      setGameState(EGAME_STATE.START);
      setPlayerTurn(EPLAY_ITEM.CHECK)
      setPlayerWon(EPLAY_ITEM.EMPTY);
      setBoard(generateBoardNxN(boardSize));
    }
  
    const toggleModal = useCallback(() => {
      setModalShow(prev => !prev);
      
      if(modalShow) setTimeout(gameReset, 200);
    }, [modalShow]);
  
    useEffect(() => {
      
      if(renderCount < 2) {
        renderCount++;
        return;
      }
  
      if(gameState === EGAME_STATE.START) return;    
  
      const result = evaluateBoard();

      switch(result) {
        case EGAME_RESULT.WON:
          setModalData(`Player ${playerTurn.toUpperCase()} won!`);
          break;
        case EGAME_RESULT.DRAW:
          setModalData(`Game Draw`);
          break;
      }
  
      setPlayerTurn((lastPlayer) => 
          lastPlayer === EPLAY_ITEM.CHECK ? EPLAY_ITEM.CIRCLE : EPLAY_ITEM.CHECK);
    }, [board]);
  
    useEffect(() => {
      if(playerWon === EPLAY_ITEM.EMPTY) return;

      toggleModal();
      setGameState(EGAME_STATE.END);
    }, [playerWon]);

    const closeModal = useCallback(() => {
      setModalData("");
      navigate("/", { replace: true });
  }, []);

    return(
        <div className="w-full h-full flex justify-center mt-16">
            <Board board={memoizedBoard} boardSize={boardSize} handleCellClick={handleCellClick} />
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