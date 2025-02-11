import Cell from "../Cell/Cell";
import { EPLAY_ITEM } from "@/App.types";

export type RowProps = {
    rowIdx: number,
    rows: EPLAY_ITEM[],
}

export default function Row({ rows, rowIdx }: RowProps) {
    
    return(
        <div className="flex items-center last:border-none border-b-[1px] border-solid border-text">
            {
                rows.map((colPlayItem, colIdx) => (
                    <Cell
                        key={colIdx} 
                        playItem={colPlayItem} 
                        data-row={`${rowIdx}`} 
                        data-col={`${colIdx}`} 
                    />
                ))
            }
        </div>
    );
}