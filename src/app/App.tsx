import { Suspense, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInited, initAuthData } from '@/entity/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router/ui/AppRouter';
import { withTheme } from './providers/ThemeProvider';

import './i18n/i18n';

const App = () => {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    const toolbar = useAppToolbar();

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited)
        return (
            <div className="app_redesigned">
                <AppLoaderLayout />
            </div>
        );

    return (
        <div className={classNames('app_redesigned', {})}>
            <Suspense fallback="">
                <MainLayout
                    content={<AppRouter />}
                    navbar={<Navbar />}
                    sidebar={<Sidebar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
};

export default withTheme(memo(App));
