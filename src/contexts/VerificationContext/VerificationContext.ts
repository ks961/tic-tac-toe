import React, { useContext } from "react";

export type VerificationContextType = {
    isSessionActive: boolean,
    updateVContext: (newState: boolean) => void;
}

export const VerificationContext = React.createContext<VerificationContextType | null>(null);

export function useVerificationContext() {
    const context = useContext(VerificationContext);

    if(!context)
        throw new Error("useVerificationContext must be used within VerificationContext.Provider child components.");

    return context;
}