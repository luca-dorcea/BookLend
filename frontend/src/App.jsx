import { useState } from "react";
import BookList from "./components/BookList.jsx";
import ThemeIcon from "./components/ThemeIcon.jsx";

const INITIAL_BOOKS = [
  { id: 1, title: "Enigma Otiliei", returned: false, condition: "good", borrower: "Ana" },
  { id: 2, title: "Maitreyi", returned: true, condition: "new", borrower: "Mihai" },
  { id: 3, title: "Ion", returned: false, condition: "worn", borrower: "Ioana" },
];

const plural = new Intl.PluralRules("ro");

function countWord(n, one, many) {
  const type = plural.select(n);
  if (type === "one") return one;
  if (type === "few") return many;
  return `de ${many}`;
}

function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [theme, setTheme] = useState(initialTheme);
  const [pendingId, setPendingId] = useState(null);

  function handleToggleReturned(id) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, returned: !b.returned } : b))
    );
  }

  function handleDelete(id) {
    setPendingId(id);
    const dialog = document.getElementById("confirm-delete");
    dialog.returnValue = "";
    dialog.showModal();
  }

  function handleConfirmClose(event) {
    if (event.currentTarget.returnValue === "delete") {
      setBooks((prev) => prev.filter((b) => b.id !== pendingId));
      document.getElementById("list-title").focus();
    }
    setPendingId(null);
  }

  function handleToggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  const lent = books.filter((b) => !b.returned).length;
  const pendingBook = books.find((b) => b.id === pendingId);
  const booksText = `${books.length} ${countWord(books.length, "carte", "cărți")}`;
  const lentText = `${lent} ${countWord(lent, "împrumutată", "împrumutate")}`;

  return (
    <>
      <a className="skip-link" href="#list-title">
        Sari la lista de cărți
      </a>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleToggleTheme}
          aria-pressed={theme === "dark"}
          aria-label="Mod întunecat"
          title="Mod întunecat"
        >
          <ThemeIcon theme={theme} />
        </button>
        <h1 translate="no">BookLend</h1>
        <p>Ține evidența cărților împrumutate prietenilor și familiei.</p>
        <p className="app-count">
          {booksText}, dintre care {lentText}
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2 id="list-title" tabIndex={-1}>Cărțile mele împrumutate</h2>
          <BookList
            books={books}
            onToggle={handleToggleReturned}
            onDelete={handleDelete}
          />
        </section>
      </main>
      <dialog
        id="confirm-delete"
        className="confirm-dialog"
        aria-labelledby="confirm-text"
        onClose={handleConfirmClose}
      >
        <form method="dialog">
          <p id="confirm-text">Ștergi „{pendingBook?.title}”?</p>
          <div className="dialog-actions">
            <button value="cancel" className="btn-secondary">
              Anulează
            </button>
            <button value="delete" className="btn-danger">
              Șterge
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
