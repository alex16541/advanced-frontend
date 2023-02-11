import 'app/styles/index.scss';
import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AboutPage } from 'pages/AboutPage';
import { useTheme } from './providers/themeProvider';
import { MainPage } from 'pages/MainPage';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router/ui/AppRouter';


const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <header>
                <nav>
                    <Link to={'/'} onClick={toggleTheme}>main</Link>
                    <Link to={'/about'} onClick={toggleTheme}>about</Link>
                </nav>
            </header>

            <AppRouter />
        </div>
    )
}

export default App;