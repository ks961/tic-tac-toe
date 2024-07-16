import { ReactNode } from "react";
import { resolveTwConflicts } from "@/utils";

export type FormProps = {
    className?: string,
    children: ReactNode | ReactNode[],
} & React.ComponentPropsWithoutRef<"form">;

const DefaultCardClass = "w-max h-max py-4 px-4 bg-background flex flex-col gap-4 items-center shadow-accent gap-3";

export default function Form({ className, children, ...attribs }: FormProps) {

    const mergedClasses = resolveTwConflicts(DefaultCardClass, className); 

    return(
        <form className={mergedClasses} {...attribs}>
            {children}
        </form>
    );
}