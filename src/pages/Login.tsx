import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext/AuthContext";



export default function Login() {
    const { updateSessionInfo } = useAuth();

    useEffect(() => {
        updateSessionInfo({
            token: "works",
            username: "now",
        });
    }, []);

    return(
        <>
            <h1>Login</h1>
        </>
    );
}