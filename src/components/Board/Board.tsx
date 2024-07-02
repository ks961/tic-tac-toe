import { useState, useEffect } from "react";
import { PlayItem } from "../../App.types";
import { boardSize } from "../../config";
import { generateBoardNxN } from "../../utils";
import Cell from "../Cell/Cell";
import Row from "../Row/Row";
import WinnerModal from "../WinnerModal/WinnerModal";


export type BoardProps = {
  currentBoardSize: number,
}

export function Board({ currentBoardSize }: BoardProps) {

    const [ board, setBoard ] = useState<PlayItem[][]>([]);
    const [ modalShow, setModalShow ] = useState<boolean>(false);
    const [ playerWon, setPlayerWon ] = useState<PlayItem>(PlayItem.EMPTY);
    const [ playerTurn, setPlayerTurn ] = useState<PlayItem>(PlayItem.CHECK);
  
    useEffect(() => {
      setBoard(generateBoardNxN(currentBoardSize));
    }, [currentBoardSize]);
  
    function handleCellClick(event: React.MouseEvent<HTMLDivElement>) {
      const element = event.target;
  
      if(!(element instanceof HTMLDivElement)) return;
  
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
        crossDiagSet.add(board[i][(currentBoardSize - i) - 1]);
      }

      if((diagSet.size === 1 && !(diagSet.has(PlayItem.EMPTY))) || 
        (crossDiagSet.size === 1 && !(crossDiagSet.has(PlayItem.EMPTY)))) return true;
  
      /* All cols evaluation */
      const cols = new Set();
      for(let col = 0; col < currentBoardSize; col++) {
        for(let row = 0; row < currentBoardSize; row++) {
          cols.add(board[row][col]);
        }
        if(cols.size === 1 && !(cols.has(PlayItem.EMPTY))) return true;
        cols.clear();
      }
  
      return false;
    }
  
    function gameReset() {
      setPlayerTurn(PlayItem.CHECK)
      setPlayerWon(PlayItem.EMPTY);
      setBoard(generateBoardNxN(currentBoardSize));
    }
  
    function toggleModal() {
      setModalShow(prev => !prev);
    }
  
    useEffect(() => {
      if(board.length === 0) return;
      
      if(evaluateBoard()) {
        setPlayerWon(playerTurn);
        return;
      }
  
      /* Since this run on board change and on-init, the initial player will be `circle` */
      setPlayerTurn((lastPlayer) => 
          lastPlayer === PlayItem.CHECK ? PlayItem.CIRCLE : PlayItem.CHECK);
    }, [board]);
  
    useEffect(() => {
      if(playerWon === PlayItem.EMPTY) return;
        
      toggleModal();
    }, [playerWon]);
  
    useEffect(() => {
      if(modalShow) return;
      setTimeout(gameReset, 200);
    }, [modalShow])
  
    const boardStyles = {
      width: "max-content",
      height: "max-content",
      border: "1px solid #0c0c0c",
      display: "grid",
      gridTemplateCols: `repeat(${boardSize}, 1fr)`,
      placeContent: "center",
    }
  
    return(
      <>
        <div style={boardStyles} onClick={handleCellClick}>
          {
            board.map((rows, rowIdx) => {
              let row: any[] = [];
              row = [...row, rows.map((playItem, colIdx) => 
                <Cell 
                  key={colIdx} 
                  playItem={playItem} 
                  data-row={`${rowIdx}`} 
                  data-col={`${colIdx}`} 
                />)];
            
              return <Row key={rowIdx}>{row}</Row>;
            })
          }
        </div>
          <WinnerModal modalShow={modalShow} toggleModal={toggleModal} player={playerWon} />
      </>
    )
  }