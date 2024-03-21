import { createContext } from 'react';

import { Theme } from '@/shared/consts/theme';

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
