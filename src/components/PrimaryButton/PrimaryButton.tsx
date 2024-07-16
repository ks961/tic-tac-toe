import React from "react";
import { OnlyAllowedTag, resolveTwConflicts } from "@/utils";
import Button, { AllowedTags, ButtonProps } from "../Button/Button";


export type PrimaryButtonProps<C extends React.ElementType> = Omit<ButtonProps<C>, "as"> & {
    as: OnlyAllowedTag<AllowedTags, C>,
};

const defaultClasses = "bg-primary select-none cursor-pointer px-8 py-3 rounded-md text-black shadow-md text-lg font-semibold transform-all duration-300 ease-in-out hover:brightness-125";

export default function PrimaryButton<C extends React.ElementType>({
     as,
     className,
     children,
     ...attribs
}: PrimaryButtonProps<C>) {

    const mergedClassNames = resolveTwConflicts(defaultClasses, className ?? "");
    
    return React.createElement(Button, {as, className: mergedClassNames, ...attribs} as any, children);
}