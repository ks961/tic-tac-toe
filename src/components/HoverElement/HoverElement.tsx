import { ReactNode } from "react";

export type HoverElementProps = {
    children: ReactNode
}

export default function HoverElement({ children }: HoverElementProps) {

    return <>{children}</>
}