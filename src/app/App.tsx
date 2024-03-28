import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInited, initAuthData } from '@/entity/User';
import { classNames } from '@/shared/lib/classNames/classNames';
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

    return (
        <div className={classNames('app', {})}>
            <Suspense fallback="">
                {inited ? (
                    <div className="app-wrapper">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter className="router" />
                        </div>
                    </div>
                ) : (
                    <PageLoader />
                )}
            </Suspense>
        </div>
    );
};

export default App;
