import { createContext, ReactNode, useContext } from "react";

export type SessionInfo = {
    token: string,
    username: string,
}

export type AuthContextType = {
    sessionInfo: SessionInfo,
    validateSession: () => boolean,
    updateSessionInfo: (newSessionInfo: SessionInfo) => void
}

export const AuthContext = createContext<AuthContextType | null>(null);

export type AuthContextProviderProps = {
    children: ReactNode | ReactNode[],
}

export function useAuth(): AuthContextType {
    const auth = useContext(AuthContext);

    if(!auth) {
        throw new Error("useAuth should be called inside Components Wrapped under `AuthContextProvider`")
    }

    return auth;
}