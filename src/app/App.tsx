import 'app/styles/index.scss';
import { useTheme } from './providers/themeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router/ui/AppRouter';
import { Navbar } from 'widgets/Navbar';


const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <AppRouter />
        </div>
    )
}

export default App;