import { useEffect } from "react";
import { ThemeProviderProps, Theme, ThemeContext } from ".";
import usePersistentState from "@/hooks/usePersistentState";

export default function ThemeProvider({ children }: ThemeProviderProps) {

    const [ theme, setTheme ] = usePersistentState<Theme>("theme", () => {
        const isDarkPrefered = window?.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDarkPrefered ? Theme.DARK : Theme.LIGHT;
    });
    
    function toggleTheme() {
        setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    }
    
    useEffect(() => {
        const htmlTag = document.documentElement;
        htmlTag.dataset['theme'] = theme;
    }, [theme]);
    
    const context = {theme, toggleTheme}
    
    return(
        <ThemeContext.Provider value={context} >
            {children}
        </ThemeContext.Provider>
    );
}