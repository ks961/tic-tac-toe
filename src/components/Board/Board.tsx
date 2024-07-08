import { useCallback, useEffect } from "react";
import { PlayItem } from "../../App.types";
import { generateBoardNxN } from "../../utils";
import WinnerModal from "../WinnerModal/WinnerModal";
import usePersistentState from "../../hooks/usePersistentState";
import useBoardContext from "@/contexts/BoardConfig/BoardConfig";
import Row from "../Row/Row";


export type BoardProps = {
  boardSize: number,
}

const enum GAME_STATE {
  END,
  START,
  PAUSED,
  PLAYING,
}

let renderCount = 0;

export function Board() {

  const { boardSize } = useBoardContext();
  
  const [ board, setBoard ] = usePersistentState<PlayItem[][]>("board", []);
  const [ modalShow, setModalShow ] = usePersistentState<boolean>("modalShow", false);
  const [ playerWon, setPlayerWon ] = usePersistentState<PlayItem>("playerWon", PlayItem.EMPTY);
  const [ gameState, setGameState ] = usePersistentState<GAME_STATE>("gameState", GAME_STATE.START);
  const [ playerTurn, setPlayerTurn ] = usePersistentState<PlayItem>("playerTurn", PlayItem.CHECK);
 
  useEffect(() => {
    if(gameState ===  GAME_STATE.PLAYING) return;

    setBoard(generateBoardNxN(boardSize));
    
  }, [boardSize]);  

  function handleCellClick(event: React.MouseEvent<HTMLDivElement>) {
    const element = event.target;

    if(!(element instanceof HTMLDivElement)) return;

    if(gameState !== GAME_STATE.PLAYING) setGameState(GAME_STATE.PLAYING);

    const playItem = element.dataset['item'];
    const rowElementIdx = parseInt(element.dataset['row'] ?? "");
    const colElementIdx = parseInt(element.dataset['col'] ?? "");

    if(!playItem || isNaN(rowElementIdx) || isNaN(colElementIdx)) return; // throw error

    if(playItem !== PlayItem.EMPTY) return;

    handleEmpty(rowElementIdx, colElementIdx);
  }

  function handleEmpty(rowElementIdx: number, colElementIdx: number) {        
    setBoard(prevBoard => {
      return prevBoard.map((rows, rowIdx) => (rowElementIdx === rowIdx) ?
        rows.map((col, colIdx) => (colElementIdx === colIdx) ? playerTurn : col) : rows)
    });
  }

  function evaluateBoard(): boolean {

    /* All rows evaluation */
    for(const rows of board) {
      const rowAsSet = new Set(rows);
      if(rowAsSet.size === 1 && !(rowAsSet.has(PlayItem.EMPTY))) return true;
    }      
    
    /* Diagonals evaluation */
    const diagSet = new Set();
    const crossDiagSet = new Set();
    for(let i = 0; i < board.length; i++) {
      diagSet.add(board[i][i]);
      crossDiagSet.add(board[i][(boardSize - i) - 1]);
    }

    if((diagSet.size === 1 && !(diagSet.has(PlayItem.EMPTY))) || 
      (crossDiagSet.size === 1 && !(crossDiagSet.has(PlayItem.EMPTY)))) return true;

    /* All cols evaluation */
    const cols = new Set();
    for(let col = 0; col < boardSize; col++) {
      for(let row = 0; row < boardSize; row++) {
        cols.add(board[row][col]);
      }
      if(cols.size === 1 && !(cols.has(PlayItem.EMPTY))) return true;
      cols.clear();
    }

    return false;
  }

  function gameReset() {
    setGameState(GAME_STATE.START);
    setPlayerTurn(PlayItem.CHECK)
    setPlayerWon(PlayItem.EMPTY);
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

    if(gameState === GAME_STATE.START) return;    

    if(evaluateBoard()) {
      setPlayerWon(playerTurn);
      return;
    }

    setPlayerTurn((lastPlayer) => 
        lastPlayer === PlayItem.CHECK ? PlayItem.CIRCLE : PlayItem.CHECK);

  }, [board]);

  useEffect(() => {
    if(playerWon === PlayItem.EMPTY) return;
    toggleModal();
    setGameState(GAME_STATE.END);
  }, [playerWon]);


  return(
    <>
      <div className={`w-max h-max border-2 border-text grid place-content-center grid-cols-[repeat(${boardSize}, 1fr)]`} onClick={handleCellClick}>
        {
          board.map((rows, rowIdx) => <Row key={rowIdx} rowIdx={rowIdx} rows={rows} />)
        }
      </div>
      <WinnerModal modalShow={modalShow} toggleModal={toggleModal} player={playerWon} />
    </>
  )
}