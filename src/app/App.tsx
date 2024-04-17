import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInited, initAuthData } from '@/entity/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router/ui/AppRouter';

const App = () => {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    const toolbar = useAppToolbar();

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited)
        return (
            <FeatureToggle
                feature="isRedesignedApp"
                off={<PageLoader />}
                on={
                    <div className="app_redesigned">
                        <AppLoaderLayout />
                    </div>
                }
            />
        );

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <div className={classNames('app', {})}>
                    <Suspense fallback="">
                        <div className="app-wrapper">
                            <Navbar />
                            <div className="content-page">
                                <Sidebar />
                                <AppRouter className="router" />
                            </div>
                        </div>
                    </Suspense>
                </div>
            }
            on={
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
            }
        />
    );
};

export default App;
