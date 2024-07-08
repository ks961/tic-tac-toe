// import { useTheme } from "@/contexts/ThemeContext";
// import { boardSize } from "../config";
import { Link } from "react-router-dom";
import { SocketContextProvider } from "../contexts/Socket";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
// import usePersistentState from "@/hooks/usePersistentState";



export default function Home() {

    return(
        <SocketContextProvider>
            <div className="grid place-content-center h-full">
                <div className="flex items-center gap-4">
                    <PrimaryButton as={Link} to="/singleplayer" className="hover:scale-105 duration-200 transition-transform ease-in">
                        Single Player
                    </PrimaryButton>
                    <PrimaryButton as={Link} to="/multiplayer/id-works" className="hover:scale-105 duration-200 transition-transform ease-in">
                        MultiPlayer
                    </PrimaryButton>
                </div>
            </div>
        </SocketContextProvider>
    );
}