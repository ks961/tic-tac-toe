import { EPLAY_ITEM } from "@/App.types.ts";
import Check from "../Icons/Check.tsx";
import Circle from "../Icons/Circle.tsx";
import useBoardContext from "@/contexts/BoardConfig/BoardConfig.ts";
import { useEffect, useRef } from "react";

export type CellProps = {
    playItem: EPLAY_ITEM,
} & React.ComponentPropsWithoutRef<"div">;

export default function Cell({ playItem, ...attribs }: CellProps) {

    const cellRef = useRef<HTMLDivElement>(null);
    const { cellWidth, cellHeight  } = useBoardContext();
    
    const classes = "flex bg-accent last:border-none border-r-[1px] border-text cursor-pointer grid place-content-center hover:scale-105 hover:border-2 hover:bg-primary transition-all duration-300 ease-in-out";

    function handleMouseOver() {

        cellRef.current?.classList.add("bg-primary");
        
        setTimeout(() => {
            cellRef.current?.classList.remove("bg-primary");
        }, 300);
    }

    useEffect(() => {
        cellRef.current?.addEventListener("mouseover", handleMouseOver);
        
        return () => {
            cellRef.current?.removeEventListener("mouseover", handleMouseOver);
        }
    }, []);
    
    return(
        <span ref={cellRef} className={classes} data-item={`${playItem}`} {...attribs} style={{width: `${cellWidth}px`, height: `${cellHeight}px`}}>
            {
                playItem === EPLAY_ITEM.CHECK ?
                    <Check /> : playItem === EPLAY_ITEM.CIRCLE ? <Circle width={cellWidth} height={cellHeight} /> : null
            }
        </span>
    );
}