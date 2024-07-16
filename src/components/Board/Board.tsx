import React from "react";
import Row from "../Row/Row";
import { EPLAY_ITEM } from "../../App.types";

export type BoardProps = {
  board: EPLAY_ITEM[][],
  boardSize: number,
  handleCellClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function Board({ board, boardSize, handleCellClick }: BoardProps) {

  return(
    <>
      <div className={`w-max h-max border-2 border-text grid place-content-center grid-cols-[repeat(${boardSize}, 1fr)]`} onClick={handleCellClick}>
        {
          board.map((rows, rowIdx) => <Row key={rowIdx} rowIdx={rowIdx} rows={rows} />)
        }
      </div>
    </>
  )
}

export default React.memo(Board);