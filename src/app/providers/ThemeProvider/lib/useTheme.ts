import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
    const { theme = Theme.DARK, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                newTheme = Theme.GREEN;
                break;
            case Theme.GREEN:
                newTheme = Theme.DARK;
                break;
            default:
                newTheme = Theme.DARK;
                break;
        }
        setTheme?.(newTheme);
    };

    return { theme, toggleTheme };
}
