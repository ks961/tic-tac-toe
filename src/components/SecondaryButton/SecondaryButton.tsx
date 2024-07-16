import React from "react";
import { OnlyAllowedTag, resolveTwConflicts } from "@/utils";
import Button, { AllowedTags, ButtonProps } from "../Button/Button";


export type SecondaryButtonProps<C extends React.ElementType> = Omit<ButtonProps<C>, "as"> & {
    as: OnlyAllowedTag<AllowedTags, C>,
};

export default function SecondaryButton<C extends React.ElementType>({
     as,
     className,
     children,
     ...attribs
}: SecondaryButtonProps<C>) {

    const mergedClassNames = resolveTwConflicts("bg-secondary cursor-pointer px-8 py-3 rounded-md text-text shadow-md text-lg font-semibold", className ?? "");
    
    return React.createElement(Button, {as, className: mergedClassNames, ...attribs} as any, children);
}