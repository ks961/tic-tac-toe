import { resolveConflicts } from "@/utils";
import React, { ReactHTML, ReactNode } from "react";

type AllowedTags = keyof 
    Pick<ReactHTML, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label">;

export type ITextProps<C extends AllowedTags> = {
    as: C;
    className?: string,
    children: ReactNode | ReactNode[],    
} & React.ComponentPropsWithoutRef<C>;

export type Styles = string;

const TagStylesMap = new Map<AllowedTags, Styles>();

TagStylesMap.set("h1", "text-text select-none font-bold text-4xl");
TagStylesMap.set("h2", "text-text select-none font-bold text-3xl");
TagStylesMap.set("h3", "text-text select-none font-bold text-2xl");
TagStylesMap.set("h4", "text-text select-none font-bold text-xl");
TagStylesMap.set("h5", "text-text select-none font-bold text-base");
TagStylesMap.set("h6", "text-text select-none font-bold text-sm");

export default function Text<C extends AllowedTags>({ as, className, children, ...attribs }: ITextProps<C>) {


    const mergedClasses = resolveConflicts(TagStylesMap.get(as), className);

    return React.createElement(as, {className: mergedClasses, ...attribs}, children);

}