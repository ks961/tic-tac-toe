import React from "react";
import { Card } from "../Card/Card";
import { useEffect, useRef } from "react";
import { resolveTwConflicts } from "@/utils";

export type DropdownProps = {
    children: JSX.Element | JSX.Element[],
    position?: "left" | "right" | "top" | "bottom"
    className?: string,
    cardClassName?: string,
}


/* TODO: Animation Position to find. */
// const positionMap = {
//     left: "right-1/2 -top-1/2 -translate-x-1/2",
//     right: "left-1/2 translate-x-1/2 -translate-y-1/2",
//     bottom: "left-1/2 -translate-x-1/2 translate-y-1/4",
//     top: "-bottom-1/2 -translate-x-1/2 -translate-y-1/2",
// }
function getComponentName(component: any) {
    return ((component as React.ReactElement<any>).type as any).name as string;
}

const cardDefaultClasses = "w-max h-full absolute mt-2 left-1/2 -translate-x-1/2 translate-y-1/4 p-3 rounded-md justify-center invisible opacity-0 transition-all duration-200 ease-in-out";
const dropDownConDefaultClasses = "relative w-10";

export default function Dropdown({ children, className, cardClassName }: DropdownProps) {

    const [  HoverElement, DropDownElement ] = React.Children.toArray(children);

    const hoverElement = getComponentName(HoverElement);
    const dropDownElement = getComponentName(DropDownElement);

    if(Array.isArray(children) && ((children.length !== 2) || (hoverElement !== "HoverElement" || dropDownElement !== "DropDownElement"))) {
        throw new Error("Only two component is accepted, wrapped inside: HoverElement and DropDownElement");
    }
        
    const hoverElementRef = useRef<HTMLDivElement>(null);
    const targetElementRef = useRef<HTMLDivElement>(null);

    function handleOnMouseOver() {
        targetElementRef.current?.classList.add("visible");
        targetElementRef.current?.classList.add("opacity-100");
        targetElementRef.current?.classList.remove("invisible");
        targetElementRef.current?.classList.remove("opacity-0");
        targetElementRef.current?.classList.remove("translate-y-1/4");
        targetElementRef.current?.classList.add("translate-y-1/5");
    }
    
    function handleOnMouseLeave() {
        // const width = hoverElementRef.current?.getBoundingClientRect().width;
        targetElementRef.current?.classList.remove("translate-y-1/5");
        targetElementRef.current?.classList.add("translate-y-1/4");
        targetElementRef.current?.classList.add("invisible");
        targetElementRef.current?.classList.remove("opacity-100");
        targetElementRef.current?.classList.add("opacity-0");
        targetElementRef.current?.classList.remove("visible");
    }

    useEffect(() => {
        hoverElementRef.current?.addEventListener("mouseover", handleOnMouseOver);
        hoverElementRef.current?.addEventListener("mouseleave", handleOnMouseLeave);
        
        return () => {
            hoverElementRef.current?.removeEventListener("mouseover", handleOnMouseOver);
            hoverElementRef.current?.removeEventListener("mouseleave", handleOnMouseLeave);
        }
    }, []);

    const cardMergedClasses = resolveTwConflicts(cardDefaultClasses, cardClassName);
    const dropDownConMergedClasses = resolveTwConflicts(dropDownConDefaultClasses, className);

    return(
        <div className={dropDownConMergedClasses} ref={hoverElementRef}>
            <>
                {HoverElement}
            </>
            <Card ref={targetElementRef} className={`${cardMergedClasses}`}>
                {DropDownElement}
            </Card>
        </div>
    );
}