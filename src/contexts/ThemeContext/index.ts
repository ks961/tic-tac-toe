import { createContext, ReactNode, useContext } from "react";

export const enum Theme {
    LIGHT = "light",
    DARK = "dark"
};

type ThemeContextProps = {
    theme: Theme;
    toggleTheme: () => void;
}

export type ThemeProviderProps = {
    children: ReactNode | ReactNode[]
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useTheme() {
    const themeContext = useContext(ThemeContext);

    if(!themeContext)
        throw new Error("useTheme should be used inside ThemeProvider!");

    return themeContext;
}