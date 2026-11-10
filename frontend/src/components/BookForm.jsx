import { useState } from "react";

const TYPES = ["Roman", "Nuvelă", "Povestiri", "Schițe", "Basm", "Memorii", "Jurnal", "Poveste"];
const CONDITIONS = [
  { value: "new", label: "Nouă" },
  { value: "good", label: "Bună" },
  { value: "worn", label: "Uzată" },
];
const MAX_TITLE = 100;
const MAX_AUTHOR = 60;
const MAX_BORROWER = 50;

export default function BookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("Roman");
  const [condition, setCondition] = useState("good");
  const [borrower, setBorrower] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");
  const [sending, setSending] = useState(false);

  function validate() {
    const t = title.trim();
    if (t === "") return ["title", "Titlul nu poate fi gol."];
    if (t.length > MAX_TITLE) return ["title", `Titlul poate avea cel mult ${MAX_TITLE} de caractere.`];
    if (author.trim().length > MAX_AUTHOR) {
      return ["author", `Numele autorului poate avea cel mult ${MAX_AUTHOR} de caractere.`];
    }
    if (borrower.trim().length > MAX_BORROWER) {
      return ["borrower", `Numele cititorului poate avea cel mult ${MAX_BORROWER} de caractere.`];
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setErrorField(problem[0]);
      setError(problem[1]);
      return;
    }
    setError("");
    setErrorField("");
    setSending(true);
    try {
      const name = borrower.trim();
      await onAdd({
        title: title.trim(),
        author: author.trim(),
        type,
        condition,
        borrower: name,
        returned: name === "",
      });
      setTitle("");
      setAuthor("");
      setType("Roman");
      setCondition("good");
      setBorrower("");
    } catch (err) {
      setError(`Nu am putut salva cartea: ${err.message}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="item-form" onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlul cărții
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Baltagul"
          maxLength={MAX_TITLE}
          autoComplete="off"
          aria-invalid={errorField === "title"}
          data-testid="form-title"
        />
      </label>
      <label>
        Autor
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ex: Mihail Sadoveanu (opțional)"
          maxLength={MAX_AUTHOR}
          autoComplete="off"
          aria-invalid={errorField === "author"}
          data-testid="form-author"
        />
      </label>
      <div className="form-row">
        <label>
          Tip
          <select value={type} onChange={(e) => setType(e.target.value)} data-testid="form-type">
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label>
          Starea cărții
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            data-testid="form-condition"
          >
            {CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Cititor
        <input
          type="text"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          placeholder="Ex: Radu (opțional)"
          maxLength={MAX_BORROWER}
          autoComplete="off"
          aria-invalid={errorField === "borrower"}
          aria-describedby="borrower-hint"
          data-testid="form-borrower"
        />
        <span id="borrower-hint" className="field-hint">
          Lasă gol dacă rămâne pe raft.
        </span>
      </label>
      {error && (
        <p className="error" data-testid="form-error">
          {error}
        </p>
      )}
      <button type="submit" disabled={sending} data-testid="form-submit">
        {sending ? "Se salvează…" : "Adaugă cartea"}
      </button>
    </form>
  );
}
