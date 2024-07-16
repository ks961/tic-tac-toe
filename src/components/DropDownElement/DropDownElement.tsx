import { ReactNode } from "react";

export type DropDownElementProps = {
    children: ReactNode | ReactNode[]
}

export default function DropDownElement({ children }: DropDownElementProps) {
    return(
        <>
            {children}
        </>
    );
}