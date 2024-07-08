import { resolveConflicts } from "@/utils";
import React, { ReactHTML } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";;

export type LinkType = typeof Link;
export type AllowedTags = keyof Pick<ReactHTML, "button" | "input"> | LinkType;

type OnlyAllowedTag<T> = T extends AllowedTags ? T : never;

export type PrimaryButtonProps<C extends React.ElementType> = {
    as: OnlyAllowedTag<C>,
    className?: string,
    children: ReactNode | ReactNode[],
} & React.ComponentPropsWithoutRef<C>;


export default function PrimaryButton<C extends React.ElementType>({
     as,
     className,
     children,
     ...attribs
}: PrimaryButtonProps<C>) {

    const mergedClassNames = resolveConflicts("bg-primary cursor-pointer px-8 py-3 rounded-md text-black shadow-md text-lg font-semibold", className ?? "");
    
    return React.createElement(as, {className: mergedClassNames, ...attribs}, children);
}