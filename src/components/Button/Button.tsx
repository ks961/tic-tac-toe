import { OnlyAllowedTag } from "@/utils";
import React from "react";
import { ReactHTML, ReactNode } from "react";
import { Link } from "react-router-dom";


export type LinkType = typeof Link;
export type AllowedTags = keyof Pick<ReactHTML, "button" | "input"> | LinkType;

export type ButtonProps<C extends React.ElementType> = {
    as: OnlyAllowedTag<AllowedTags, C>;
    className?: string,
    children?: ReactNode | ReactNode[],
} & React.ComponentPropsWithoutRef<C>;


export default function Button<C extends React.ElementType>({
     as,
     className,
     children,
     ...attribs
}: ButtonProps<C>) {    
    
    return React.createElement(as, {className, ...attribs}, children);
}