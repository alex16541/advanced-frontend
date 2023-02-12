import 'app/styles/index.scss';
import { useTheme } from './providers/themeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router/ui/AppRouter';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';


const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <div className='content-page'>
                <Sidebar />
                <AppRouter className='page-wrapper' />
            </div>
        </div>
    )
}

export default App;