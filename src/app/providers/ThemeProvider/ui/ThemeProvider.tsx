import { useMemo, useState, useEffect, ReactNode } from 'react';

import { getUserInited, useJsonSettings } from '@/entity/User';
import { Theme } from '@/shared/consts/theme';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme = Theme.LIGHT, children } = props;

    const inited = useAppSelector(getUserInited);
    const { theme: userTheme } = useJsonSettings();
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
            setTheme(userTheme ?? Theme.LIGHT);
        }
    }, [inited, userTheme]);

    useEffect(() => {
        const root = document.getElementById('root');
        if (root) root.className = `root ${theme}`;
    }, [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
