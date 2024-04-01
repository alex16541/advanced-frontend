import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInited, initAuthData } from '@/entity/User';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/FeatureToggle/FeatureToggle';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router/ui/AppRouter';

const App = () => {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) return <PageLoader />;

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
                            toolbar={<div>test</div>}
                        />
                    </Suspense>
                </div>
            }
        />
    );
};

export default App;
