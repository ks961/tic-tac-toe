import { PlayItem } from "../../App.types.ts";
import { CellSize } from "../../config.ts";
import Circle from "../Icons/Circle.tsx";
import Check from "../Icons/Check.tsx";
import useBoardContext from "@/contexts/BoardConfig/BoardConfig.ts";

export type CellProps = {
    playItem: PlayItem,
} & React.ComponentPropsWithoutRef<"div">;

export default function Cell({ playItem, ...attribs }: CellProps) {

    const { cellWidth, cellHeight  } = useBoardContext();
    
    return(
        <div className={`bg-accent w-[${cellWidth}px] h-[${cellHeight}px] last:border-none border-r-[1px] border-text cursor-pointer grid place-content-center`} data-item={`${playItem}`} {...attribs}>
            {
                playItem === PlayItem.CHECK ?
                    <Check /> : playItem === PlayItem.CIRCLE ? <Circle width={CellSize.width} height={CellSize.height} /> : null
            }
        </div>
    );
}