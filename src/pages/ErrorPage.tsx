import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";



export default function ErrorPage() {

    const { isAuthenticated } = useAuth();

    if(!isAuthenticated)
        return <Navigate to="/login"  replace/>
}