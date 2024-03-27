import { useContext } from 'react';

import { Theme } from '@/shared/consts/theme';

import { ThemeContext } from '../lib/context/ThemeContext';

interface UseThemeResult {
    theme: Theme;
    toggleTheme: (saveAction: (theme: Theme) => void) => void;
}

export function useTheme(): UseThemeResult {
    const { theme = Theme.DARK, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction: (theme: Theme) => void) => {
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
        saveAction(newTheme);
    };

    return { theme, toggleTheme };
}
