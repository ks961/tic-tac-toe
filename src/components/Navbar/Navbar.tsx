import { Link, useLocation, useNavigate } from "react-router-dom";
import Text from "../Text/Text";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import NavLink from "../NavLink/NavLink";
import { NavLinkType } from "@/model/NavLink";
import ThemeButton from "../ThemeButton/ThemeButton";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import Dropdown from "../Dropdown/Dropdown";
import HoverElement from "../HoverElement/HoverElement";
import DropDownElement from "../DropDownElement/DropDownElement";
import user from "src/assets/user.png";
import ProfileImg from "../ProfileImg/ProfileImg";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { usePlayerContext } from "@/contexts/PlayerContext/PlayerContext";

export type NavbarProps = {
    navItems: NavLinkType[],
}

export default function Navbar({ navItems }: NavbarProps) {  

    const location = useLocation();
    const naviagate = useNavigate();
    const { username } = usePlayerContext();
    const { isAuthenticated, logout } = useAuth();

    function handleLogout() {
        logout();
        naviagate("/login", { replace: true });
    }

    const filteredButtonLinks = navItems.filter(link => link.to !== location.pathname && link?.isButton);

    return(
        <div className="p-4 flex items-center justify-between">
            <div>
                <Link to="/">
                    <Text as="h2" className="font-playwrite-cuba font-semibold">Tic-Tac-Toe</Text>
                </Link>
            </div>
            <div className="flex items-center gap-8">
                <div>
                    <ul className="flex items-center gap-4">
                        {
                            navItems.map(link => 
                                (link.to !== location.pathname && !link?.isButton) ?
                                    (<li key={link.text}>
                                        <NavLink to={link.to} text={link.text} /> 
                                    </li>) : null
                            )
                        }
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeButton className="mr-3" />
                    {
                        isAuthenticated ?
                            <Dropdown className="w-20" cardClassName="left-1/3 h-full flex items-center py-10">
                                <HoverElement>
                                    <ProfileImg src={user} alt="user" title={username} />
                                </HoverElement>
                                <DropDownElement>
                                    <SecondaryButton 
                                        as="button" 
                                        className="text-sm text-text px-4 py-3"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </SecondaryButton>
                                </DropDownElement>
                            </Dropdown> :
                            <>
                                {
                                    filteredButtonLinks.map(link =>
                                        <PrimaryButton className="px-4 py-2 text-lg" key={link.text} as={Link} to={link.to}>
                                            {link.text}
                                        </PrimaryButton>
                                    )
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
}