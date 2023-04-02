import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import style from './Layout.module.css';

const Layout = () => {
    return (
        <>
            <header className={style.Header}>
                <div className={style.Container}>
                    <ul className={style.HeaderList}>
                        <li className={style.HeaderItem}>
                            <NavLink to="/" className={style.Headerlink}>Home</NavLink>
                        </li>
                        <li className={style.HeaderItem}>
                            <NavLink to="/movies" className={style.Headerlink}>Movies</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};

export default Layout;