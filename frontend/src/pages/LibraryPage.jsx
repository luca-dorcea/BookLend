import { useEffect, useState } from "react";
import BookForm from "../components/BookForm.jsx";
import BookList from "../components/BookList.jsx";
import FilterSelect from "../components/FilterSelect.jsx";
import LentList from "../components/LentList.jsx";
import Shelf from "../components/Shelf.jsx";
import { createBook, deleteBook, fetchBooks, updateBook } from "../api.js";
import { CONDITIONS } from "../constants.js";
import styles from "./LibraryPage.module.css";

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

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failed, setFailed] = useState(false);
  const [lendId, setLendId] = useState(null);
  const [lendError, setLendError] = useState("");
  const [justLentId, setJustLentId] = useState(null);
  const [deleted, setDeleted] = useState(null);
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
        if (!ignore) {
          setError(`Nu am putut încărca datele: ${err.message}.`);
          setFailed(true);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!deleted) return;
    const timer = setTimeout(() => setDeleted(null), 8000);
    return () => clearTimeout(timer);
  }, [deleted]);

  async function handleAdd(book) {
    const created = await createBook(book);
    setBooks((prev) => [...prev, created]);
    if (!created.returned) setJustLentId(created.id);
  }

  async function handleToggle(id) {
    const book = books.find((b) => b.id === id);
    try {
      const updated = await updateBook(id, { returned: !book.returned });
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
      setError(null);
    } catch (err) {
      setError(`Nu am putut salva modificarea: ${err.message}.`);
    }
  }

  function handleLend(id) {
    setLendId(id);
    setLendError("");
    const dialog = document.getElementById("lend-dialog");
    const form = dialog.querySelector("form");
    form.reset();
    form.elements.condition.value = books.find((b) => b.id === id).condition;
    dialog.showModal();
  }

  async function handleLendSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const borrower = form.get("borrower").trim();
    const condition = form.get("condition");
    try {
      const updated = await updateBook(lendId, { returned: false, borrower, condition });
      setBooks((prev) => prev.map((b) => (b.id === lendId ? updated : b)));
      setJustLentId(lendId);
      setError(null);
      document.getElementById("lend-dialog").close();
      document.getElementById("lent-title").focus();
    } catch (err) {
      setLendError(`Nu am putut salva împrumutul: ${err.message}.`);
    }
  }

  async function handleDelete(id) {
    const book = books.find((b) => b.id === id);
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      setDeleted(book);
      setError(null);
      document.getElementById("library-title").focus();
    } catch (err) {
      setError(`Nu am putut șterge cartea: ${err.message}.`);
    }
  }

  async function handleUndo() {
    const book = deleted;
    setDeleted(null);
    try {
      const restored = await createBook(book);
      setBooks((prev) => [...prev, restored].sort((a, b) => a.id - b.id));
    } catch (err) {
      setError(`Nu am putut readuce cartea: ${err.message}.`);
    }
  }

  function handleResetFilters() {
    setType("");
    setGenre("");
    setAuthor("");
    setReader("");
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
  const lendBook = books.find((b) => b.id === lendId);

  return (
    <>
      <div className={styles.top}>
        <Shelf books={books} />
        <div className={styles.label}>
          <p>Ține evidența cărților împrumutate prietenilor și familiei.</p>
          {!loading && !failed && (
            <p className={styles.count}>
              {booksText}, dintre care {lentText}
            </p>
          )}
        </div>
      </div>
      <div className={`sheet ${styles.grid}`}>
        {!failed && (
          <div className={styles.filters} role="group" aria-label="Filtre">
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
              <button type="button" className="btn btn-secondary" onClick={handleResetFilters}>
                Resetează filtrele
              </button>
            )}
            <p className={styles.filterCount} aria-live="polite">
              {filtering ? `Se afișează ${shownBooks.length} din ${books.length}` : ""}
            </p>
          </div>
        )}
        {loading && (
          <p className={`info ${styles.status}`} data-testid="loading">
            Se încarcă biblioteca…
          </p>
        )}
        {error && (
          <p className={`error ${styles.status}`} data-testid="error">
            {error} Verifică dacă rulează serverul (<code>npm run dev</code> în <code>backend</code>).
          </p>
        )}
        {!loading && (
          <>
            <aside className={styles.sidebar}>
              {!failed && (
                <section className="panel">
                  <h2 id="lent-title" tabIndex={-1}>Cărți împrumutate</h2>
                  {readers.length > 0 && (
                    <div className={styles.readerFilter}>
                      <FilterSelect
                        label="Cititor"
                        value={activeReader}
                        options={readers}
                        allLabel="Toți cititorii"
                        onChange={setReader}
                      />
                    </div>
                  )}
                  <LentList
                    books={shownLent}
                    emptyText={
                      lentBooks.length === 0
                        ? "Nu ai împrumutat încă nicio carte."
                        : "Nicio carte împrumutată nu se potrivește filtrelor."
                    }
                    justLentId={justLentId}
                    onReturn={handleToggle}
                  />
                </section>
              )}
              <section className={`panel ${styles.formPanel}`}>
                <h2>Adaugă o carte</h2>
                <BookForm onAdd={handleAdd} />
              </section>
            </aside>
            {!failed && (
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
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              </section>
            )}
          </>
        )}
      </div>
      <div className={styles.toastRegion} role="status">
        {deleted && (
          <div className={styles.toast}>
            <span>„{deleted.title}” a fost ștearsă.</span>
            <button type="button" className={styles.undo} onClick={handleUndo}>
              Anulează
            </button>
          </div>
        )}
      </div>
      <dialog id="lend-dialog" className={styles.dialog} aria-labelledby="lend-text">
        <form method="dialog" onSubmit={handleLendSubmit}>
          <p id="lend-text" className={styles.dialogTitle}>
            Împrumută „{lendBook?.title}”
          </p>
          <label className={styles.field}>
            Cititor
            <input
              type="text"
              name="borrower"
              placeholder="Ex: Radu (opțional)"
              maxLength={50}
              autoComplete="off"
            />
          </label>
          <label className={styles.field}>
            Starea cărții
            <select name="condition">
              {CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          {lendError && <p className="error">{lendError}</p>}
          <div className={styles.dialogActions}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => document.getElementById("lend-dialog").close()}
            >
              Anulează
            </button>
            <button className="btn btn-primary">Împrumută</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
