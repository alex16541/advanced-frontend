import {
    FC, useMemo, useState, useEffect,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const {
        initialTheme = defaultTheme,
        children,
    } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme, setTheme]);

    // useEffect(() => {
    // document.getElementById('root').className = theme;
    // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    // }, [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
