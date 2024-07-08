import usePersistentState from "@/hooks/usePersistentState";
import { AuthContextProviderProps, SessionInfo, AuthContext } from "./AuthContext";

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [ sessionInfo, setSessionInfo ] = usePersistentState<SessionInfo>("auth", {
        token: "",
        username: "",
    });

    function updateSessionInfo(newSessionInfo: SessionInfo) {
        setSessionInfo(newSessionInfo);
    }

    function validateSession(): boolean {
        return false;
    }

    const value = {
        sessionInfo,
        updateSessionInfo,
        validateSession
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}