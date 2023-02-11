import 'app/styles/index.scss';
import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AboutPage } from 'pages/AboutPage';
import { useTheme } from './providers/ThemeProvider';
import { MainPage } from 'pages/MainPage';
import { classNames } from 'shared/lib/classNames/classNames';


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

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/about' element={<AboutPage />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App;