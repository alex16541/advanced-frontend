import { useMemo, useState, useEffect, ReactNode } from 'react';

import { getUserInited, useJsonSettings } from '@/entity/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localstorage';
import { Theme } from '@/shared/consts/theme';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

// const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme = Theme.LIGHT, children } = props;
    const inited = useAppSelector(getUserInited);
    const userTheme = useJsonSettings();
    const [theme, setTheme] = useState<Theme>(initialTheme);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme, setTheme],
    );

    useEffect(() => {
        if (inited) {
            setTheme(userTheme.theme ?? Theme.LIGHT);
        }
    }, [inited, userTheme.theme]);

    useEffect(() => {
        const root = document.getElementById('root');
        if (root) root.className = `root ${theme}`;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
