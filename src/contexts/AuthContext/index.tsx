import { useCallback, useEffect, useMemo} from "react";
import useFetch from "@/hooks/useFetch";
import usePersistentState from "@/hooks/usePersistentState";
import { AuthContextProviderProps, AuthContext, Session, AuthContextType } from "./AuthContext";
import { BackendUrl } from "@/config";

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    
    const [ session, setSession, cleanup ] = usePersistentState<Session>("session", {
        token: "",
        isAuthenticated: false
    }, {deferredStore: true});

    const { triggerFetch } = useFetch<boolean>(`${BackendUrl}/verifytoken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }, session.token, { requestOnExplicitTrigger: true });

    const login = useCallback((newToken: string) => {
        setSession({
            token: newToken,
            isAuthenticated: true
        });
    }, [session]);
    
    const logout = useCallback(() => {            
        cleanup();

        setSession({
            token: "",
            isAuthenticated: false,
        });
    }, [session]);
    
    useEffect(() => {
        if(!session.isAuthenticated) return;
        
        (async() => {
            
            const isValid = await validateSession();
            
            if(!isValid && (session.token.length > 0 || session.isAuthenticated)) {
                setSession({token: "", isAuthenticated: false});
                return;
            }
        })();

    }, [session.isAuthenticated, session.token]);

    async function validateSession() {

        const isValid: boolean | undefined = await triggerFetch({token: session.token});
        
        if(!isValid) return false;

        return isValid;
    }

    const context: AuthContextType = useMemo(() => ({
            ...session,
            login,
            logout,
            validateSession,
        }
    ), [session, login, logout, validateSession]);

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}