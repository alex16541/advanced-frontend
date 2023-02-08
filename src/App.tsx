import './styles/index.scss';
import { Suspense, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AboutPageAsync from "./pages/AboutPage/AboutPage.async";
import MainPageAsync from './pages/MainPage/MainPage.async';
import { Theme } from "./theme/ThemeContext";
import { useTheme } from './theme/useTheme';


const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`app ${theme}`}>
            <header>
                <nav>
                    <Link to={'/'} onClick={toggleTheme}>main</Link>
                    <Link to={'/about'} onClick={toggleTheme}>about</Link>
                </nav>
            </header>

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<MainPageAsync />} />
                    <Route path='/about' element={<AboutPageAsync />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App;