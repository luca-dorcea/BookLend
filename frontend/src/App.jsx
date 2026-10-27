import { useState } from "react";
import BookList from "./components/BookList.jsx";

const INITIAL_BOOKS = [
  { id: 1, title: "Enigma Otiliei", returned: false, condition: "good", borrower: "Ana" },
  { id: 2, title: "Maitreyi", returned: true, condition: "new", borrower: "Mihai" },
  { id: 3, title: "Ion", returned: false, condition: "worn", borrower: "Ioana" },
];

function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [theme, setTheme] = useState(initialTheme);

  function handleToggleReturned(id) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, returned: !b.returned } : b))
    );
  }

  function handleDelete(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  function handleToggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  const lent = books.filter((b) => !b.returned).length;

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleToggleTheme}
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>BookLend</h1>
        <p>Ține evidența cărților împrumutate prietenilor și familiei.</p>
        <p className="app-count">
          {books.length} cărți, dintre care {lent} împrumutate
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>Cărțile mele împrumutate</h2>
          <BookList
            books={books}
            onToggle={handleToggleReturned}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}
