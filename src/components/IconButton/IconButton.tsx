import React from "react";
import { resolveTwConflicts } from "@/utils";
import Button, { ButtonProps } from "../Button/Button";

export type IconButtonProps<C extends React.ElementType> = Omit<ButtonProps<C>, "as">;

export default function IconButton<C extends React.ElementType = "button">({
     className,
     children,
     ...attribs
}: IconButtonProps<C>) {
    
    const mergedClassNames = resolveTwConflicts("w-8 h-8", className);
    
    return React.createElement(Button, {as: "button", className: mergedClassNames, ...attribs} as any, children);
}