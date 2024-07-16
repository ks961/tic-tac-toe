import Navbar from "../Navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext/AuthContext";

export type ProtectedRouteProps = {
    [key: string]: any;
    element: ReactNode;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
      return <Navigate to={"/login"} replace />;
    }
    
    return (
      <>
        <Navbar navItems={[]} />
        { element }
      </>
    );
}