import Text from "../Text/Text";
import { Link } from "react-router-dom";

export type NavLinkProps = {
    to: string,
    text: string,
}

export default function NavLink({ to, text }: NavLinkProps) {
    return(
        <Link to={to}>
            <Text as="p">{text}</Text>
        </Link>
    );
}