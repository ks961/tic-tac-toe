import { ReactNode, useCallback, useMemo, useState } from "react"
import { VerificationContext, VerificationContextType } from "./VerificationContext";


export type VerificationContextProviderProps = {
    children: ReactNode | ReactNode[];
}

export function VerificationContextProvider({ children }: VerificationContextProviderProps) {
    const [ isInVerificationSession, setIsInVerificationSession ] = useState<boolean>(false);


    const updateVContext = useCallback((newState: boolean) => {
        setIsInVerificationSession(newState);
    }, [isInVerificationSession]);

    const memoizedContext = useMemo<VerificationContextType>(() => ({
        isSessionActive: isInVerificationSession,
        updateVContext
    }), [isInVerificationSession]);

    return (
        <VerificationContext.Provider value={memoizedContext}>
            {children}
        </VerificationContext.Provider>
    )
}