import { resolveTwConflicts } from "@/utils";
import { forwardRef, ReactNode } from "react";

export type CardProps = {
    className?: string,
    children: ReactNode | ReactNode[];
} & React.ComponentPropsWithRef<"div">;

const DefaultCardClass = "w-max h-max bg-gray-100 rounded-lg shadow-lg";

function RefCard({ className, children, ...attribs }: CardProps, ref: any) {

    const mergedClasses = resolveTwConflicts(DefaultCardClass, className);
    
    return(
        <div ref={ref} {...attribs} className={mergedClasses}>
            {children}
        </div>
    );
}

export const Card = forwardRef(RefCard);