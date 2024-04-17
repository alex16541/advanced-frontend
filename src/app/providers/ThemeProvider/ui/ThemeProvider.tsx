import { useMemo, useState, useEffect, ReactNode } from 'react';

import { getUserInited } from '@/entity/User';
import { LAST_USED_THEME } from '@/shared/consts/localstorage';
import { Theme } from '@/shared/consts/theme';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

const fallbackTheme = localStorage.getItem(LAST_USED_THEME) as Theme;

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme = fallbackTheme || Theme.LIGHT, children } = props;

    const inited = useAppSelector(getUserInited);
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
            setTheme(initialTheme ?? Theme.LIGHT);
            localStorage.setItem(LAST_USED_THEME, initialTheme ?? Theme.LIGHT);
        }
    }, [inited, initialTheme]);

    useEffect(() => {
        const root = document.getElementById('root');
        const cls = `root ${theme}`;
        if (root) root.className = cls;
        document.body.className = cls;
    }, [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
