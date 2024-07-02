import { PlayItem } from "../../App.types.ts";
import { CellSize } from "../../config.ts";
import Circle from "../Icons/Circle.tsx";
import Check from "../Icons/Check.tsx";

export type CellProps = {
    playItem: PlayItem
} & React.ComponentPropsWithoutRef<"div">;


const styles = {
    width: `${CellSize.width}px`, 
    height: `${CellSize.height}px`, 
    backgroundColor: "blueviolet",
    cursor: "pointer",
    borderRight: "1px solid #0c0c0c",
    display: "grid",
    placeContent: "center",
}

export default function Cell({ playItem, ...attribs }: CellProps) {
    
    return(
        <div className='app-board-cell' style={styles} data-item={`${playItem}`} {...attribs}>
            {
                playItem === PlayItem.CHECK ?
                    <Check /> : playItem === PlayItem.CIRCLE ? <Circle width={CellSize.width} height={CellSize.height} /> : null
            }
        </div>
    );
}