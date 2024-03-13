import { createContext } from 'react';

import { Theme } from '@/shared/const/theme';

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
