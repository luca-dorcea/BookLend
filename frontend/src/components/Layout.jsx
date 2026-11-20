import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Bookcase from "./Bookcase.jsx";
import Lamp from "./Lamp.jsx";
import ThemeIcon from "./ThemeIcon.jsx";
import styles from "./Layout.module.css";

function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [theme, setTheme] = useState(initialTheme);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function handleToggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <>
      <Bookcase />
      <a className={styles.skip} href="#content">
        Sari la conținut
      </a>
      <header className={styles.header}>
        <button
          className={styles.toggle}
          onClick={handleToggleTheme}
          aria-pressed={theme === "dark"}
          aria-label="Mod întunecat"
          title="Mod întunecat"
        >
          <ThemeIcon theme={theme} />
        </button>
        <div className={styles.inner}>
          <Lamp theme={theme} />
          <h1 className={styles.logo} translate="no">
            BookLend
          </h1>
          <nav className={styles.nav} data-testid="nav" aria-label="Pagini">
            <NavLink to="/" end className={navClass}>
              Biblioteca
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              Despre
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="content" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Proiect Tehnologii Web</footer>
    </>
  );
}
