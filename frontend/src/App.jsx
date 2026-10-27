import { useState } from "react";
import BookList from "./components/BookList.jsx";
import LentList from "./components/LentList.jsx";
import ThemeIcon from "./components/ThemeIcon.jsx";
import { INITIAL_BOOKS } from "./books.js";

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
  const [lendId, setLendId] = useState(null);
  const [justLentId, setJustLentId] = useState(null);

  function handleLend(id) {
    setLendId(id);
    const dialog = document.getElementById("lend-dialog");
    dialog.returnValue = "";
    dialog.showModal();
  }

  function handleLendClose(event) {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "lend") {
      const form = new FormData(dialog.querySelector("form"));
      const borrower = form.get("borrower").trim();
      const condition = form.get("condition");
      setBooks((prev) =>
        prev.map((b) =>
          b.id === lendId ? { ...b, returned: false, borrower, condition } : b
        )
      );
      setJustLentId(lendId);
      document.getElementById("lent-title").focus();
    }
    setLendId(null);
  }

  function handleReturn(id) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, returned: true } : b))
    );
    document.getElementById("lent-title").focus();
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
      document.getElementById("library-title").focus();
    }
    setPendingId(null);
  }

  function handleToggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  const lentBooks = books.filter((b) => !b.returned);
  const booksText = `${books.length} ${countWord(books.length, "carte", "cărți")}`;
  const lentText = `${lentBooks.length} ${countWord(lentBooks.length, "împrumutată", "împrumutate")}`;
  const pendingBook = books.find((b) => b.id === pendingId);
  const lendBook = books.find((b) => b.id === lendId);

  return (
    <>
      <a className="skip-link" href="#library-title">
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
          <h2 id="library-title" tabIndex={-1}>Biblioteca mea</h2>
          <BookList books={books} onLend={handleLend} onDelete={handleDelete} />
        </section>
        <section className="panel panel-lent">
          <h2 id="lent-title" tabIndex={-1}>Cărți împrumutate</h2>
          <LentList
            books={lentBooks}
            justLentId={justLentId}
            onReturn={handleReturn}
          />
        </section>
      </main>
      <dialog
        id="lend-dialog"
        className="confirm-dialog"
        aria-labelledby="lend-text"
        onClose={handleLendClose}
      >
        <form method="dialog" key={lendId}>
          <p id="lend-text" className="dialog-title">
            Împrumută „{lendBook?.title}”
          </p>
          <label className="dialog-field">
            Cititor
            <input
              type="text"
              name="borrower"
              placeholder="Ex: Radu (opțional)"
              maxLength={50}
              autoComplete="off"
              autoFocus
            />
          </label>
          <label className="dialog-field">
            Starea cărții
            <select name="condition" defaultValue={lendBook?.condition}>
              <option value="new">Nouă</option>
              <option value="good">Bună</option>
              <option value="worn">Uzată</option>
            </select>
          </label>
          <div className="dialog-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => document.getElementById("lend-dialog").close()}
            >
              Anulează
            </button>
            <button value="lend" className="btn-primary">
              Împrumută
            </button>
          </div>
        </form>
      </dialog>
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
