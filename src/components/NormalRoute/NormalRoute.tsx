import { normalNavLinks } from "@/model/NavLink";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export type NormalRouteProps = {
    element: JSX.Element | JSX.Element[],
}

export default function NormalRoute({ element }: NormalRouteProps) {

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if(isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated]);

    return(
        <>
            <Navbar navItems={normalNavLinks} />
            {element}
        </>
    );
}