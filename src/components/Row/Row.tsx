import { ReactNode } from "react";

export type RowProps = {
    children: ReactNode | ReactNode[],
}

const styles: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #0c0c0c"
}

export default function Row({ children }: RowProps) {
    return(
        <div style={styles}>
            {children}
        </div>
    );
}