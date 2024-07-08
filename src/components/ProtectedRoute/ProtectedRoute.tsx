import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";

export type ProtectedRouteProps = {
    [key: string]: any;
    element: ReactNode;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {

    const { sessionInfo } = useAuth();
    
    if (!sessionInfo.token) {
      return <Navigate to="/login" />;
    }
  
    return element;
}