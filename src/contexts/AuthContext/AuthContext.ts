import { createContext, ReactNode, useContext } from "react";

export type Session = {
    token: string,
    isAuthenticated: boolean,
}

export type AuthContextType = Session & {
    logout: () => void;
    login: (newToken: string) => void;
    validateSession: () => Promise<boolean>,
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