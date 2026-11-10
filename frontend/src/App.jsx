import { useEffect, useState } from "react";
import BookList from "./components/BookList.jsx";
import FilterSelect from "./components/FilterSelect.jsx";
import LentList from "./components/LentList.jsx";
import Bookcase from "./components/Bookcase.jsx";
import Lamp from "./components/Lamp.jsx";
import ThemeIcon from "./components/ThemeIcon.jsx";
import { fetchBooks } from "./api.js";

const plural = new Intl.PluralRules("ro");

function countWord(n, one, many) {
  const type = plural.select(n);
  if (type === "one") return one;
  if (type === "few") return many;
  return `de ${many}`;
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "ro"));
}

function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(initialTheme);
  const [pendingId, setPendingId] = useState(null);
  const [lendId, setLendId] = useState(null);
  const [justLentId, setJustLentId] = useState(null);
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [reader, setReader] = useState("");

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchBooks();
        if (!ignore) setBooks(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  function handleLend(id) {
    setLendId(id);
    const dialog = document.getElementById("lend-dialog");
    const form = dialog.querySelector("form");
    form.reset();
    form.elements.condition.value = books.find((b) => b.id === id).condition;
    dialog.showModal();
  }

  function handleLendSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const borrower = form.get("borrower").trim();
    const condition = form.get("condition");
    setBooks((prev) =>
      prev.map((b) =>
        b.id === lendId ? { ...b, returned: false, borrower, condition } : b
      )
    );
    setJustLentId(lendId);
    document.getElementById("lend-dialog").close();
    document.getElementById("lent-title").focus();
  }

  function handleReturn(id) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, returned: true } : b))
    );
    document.getElementById("lent-title").focus();
  }

  function handleDelete(id) {
    setPendingId(id);
    document.getElementById("confirm-delete").showModal();
  }

  function handleDeleteSubmit(event) {
    event.preventDefault();
    setBooks((prev) => prev.filter((b) => b.id !== pendingId));
    document.getElementById("confirm-delete").close();
    document.getElementById("library-title").focus();
  }

  function handleResetFilters() {
    setType("");
    setGenre("");
    setAuthor("");
    setReader("");
  }

  function handleToggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  const lentBooks = books.filter((b) => !b.returned);

  const types = uniqueSorted(books.map((b) => b.type));
  const genres = uniqueSorted(books.map((b) => b.genre));
  const authors = uniqueSorted(books.map((b) => b.author));
  const readers = uniqueSorted(lentBooks.map((b) => b.borrower));
  const activeType = types.includes(type) ? type : "";
  const activeGenre = genres.includes(genre) ? genre : "";
  const activeAuthor = authors.includes(author) ? author : "";
  const activeReader = readers.includes(reader) ? reader : "";

  function matches(b) {
    return (
      (!activeType || b.type === activeType) &&
      (!activeGenre || b.genre === activeGenre) &&
      (!activeAuthor || b.author === activeAuthor)
    );
  }

  const shownBooks = books.filter(matches);
  const shownLent = lentBooks.filter(
    (b) => matches(b) && (!activeReader || b.borrower === activeReader)
  );
  const filtering = activeType || activeGenre || activeAuthor;
  const booksText = `${books.length} ${countWord(books.length, "carte", "cărți")}`;
  const lentText = `${lentBooks.length} ${countWord(lentBooks.length, "împrumutată", "împrumutate")}`;
  const pendingBook = books.find((b) => b.id === pendingId);
  const lendBook = books.find((b) => b.id === lendId);

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <Bookcase />
        <Lamp />
      </div>
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
        <div className="plaque">
          <h1 translate="no">BookLend</h1>
          <p>Ține evidența cărților împrumutate prietenilor și familiei.</p>
          <p className="app-count">
            {booksText}, dintre care {lentText}
          </p>
        </div>
      </header>
      <main className="container">
        <div className="filters" role="group" aria-label="Filtre">
          <FilterSelect
            label="Tip"
            value={activeType}
            options={types}
            allLabel="Toate tipurile"
            onChange={setType}
          />
          <FilterSelect
            label="Gen"
            value={activeGenre}
            options={genres}
            allLabel="Toate genurile"
            onChange={setGenre}
          />
          <FilterSelect
            label="Autor"
            value={activeAuthor}
            options={authors}
            allLabel="Toți autorii"
            onChange={setAuthor}
          />
          {(filtering || activeReader) && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleResetFilters}
            >
              Resetează filtrele
            </button>
          )}
          <p className="filter-count" aria-live="polite">
            {filtering ? `Se afișează ${shownBooks.length} din ${books.length}` : ""}
          </p>
        </div>
        {loading && <p className="info status-message">Se încarcă biblioteca…</p>}
        {error && (
          <p className="error status-message">
            Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
          </p>
        )}
        {!loading && !error && (
          <>
            <section className="panel">
              <h2 id="library-title" tabIndex={-1}>Biblioteca mea</h2>
              <BookList
                books={shownBooks}
                emptyText={
                  books.length === 0
                    ? "Nu ai nicio carte în bibliotecă."
                    : "Nicio carte nu se potrivește filtrelor."
                }
                justLentId={justLentId}
                onLend={handleLend}
                onDelete={handleDelete}
              />
            </section>
            <section className="panel panel-lent">
              <h2 id="lent-title" tabIndex={-1}>Cărți împrumutate</h2>
              {readers.length > 0 && (
                <FilterSelect
                  label="Cititor"
                  value={activeReader}
                  options={readers}
                  allLabel="Toți cititorii"
                  onChange={setReader}
                />
              )}
              <LentList
                books={shownLent}
                emptyText={
                  lentBooks.length === 0
                    ? "Nu ai împrumutat încă nicio carte."
                    : "Nicio carte împrumutată nu se potrivește filtrelor."
                }
                justLentId={justLentId}
                onReturn={handleReturn}
              />
            </section>
          </>
        )}
      </main>
      <dialog
        id="lend-dialog"
        className="confirm-dialog"
        aria-labelledby="lend-text"
      >
        <form method="dialog" onSubmit={handleLendSubmit}>
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
            />
          </label>
          <label className="dialog-field">
            Starea cărții
            <select name="condition">
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
            <button className="btn-primary">
              Împrumută
            </button>
          </div>
        </form>
      </dialog>
      <dialog
        id="confirm-delete"
        className="confirm-dialog"
        aria-labelledby="confirm-text"
      >
        <form method="dialog" onSubmit={handleDeleteSubmit}>
          <p id="confirm-text">Ștergi „{pendingBook?.title}”?</p>
          <div className="dialog-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => document.getElementById("confirm-delete").close()}
            >
              Anulează
            </button>
            <button className="btn-danger">
              Șterge
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
