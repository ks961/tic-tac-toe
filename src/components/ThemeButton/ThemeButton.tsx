import { Theme, useTheme } from "@/contexts/ThemeContext";
import IconButton from "../IconButton/IconButton";
import Moon from "../Icons/Moon";
import Sun from "../Icons/Sun";
import { resolveTwConflicts } from "@/utils";

export type ThemeButtonProps = {
    className?: string,
}

const defaultClasses = "grid place-content-center p-1 border-2 border-text rounded-md";
export default function ThemeButton({ className }: ThemeButtonProps) {

    const { theme, toggleTheme } = useTheme();

    const mergedClasses = resolveTwConflicts(defaultClasses, className);

    return(
        <IconButton className={mergedClasses} onClick={toggleTheme}>
            {
                theme === Theme.DARK ?
                    <Moon /> : <Sun />
            }         
        </IconButton>
    );
}