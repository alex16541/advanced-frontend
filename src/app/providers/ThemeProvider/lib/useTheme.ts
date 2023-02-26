import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export interface UseThemeResult {
    theme: Theme,
    toggleTheme: () => void
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme(newTheme);
    };

    return { theme, toggleTheme };
}
