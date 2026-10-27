const CONDITION_LABELS = { new: "nouă", good: "bună", worn: "uzată" };

export default function BookCard({ book, onToggle, onDelete }) {
  return (
    <li className={book.returned ? "item-card done" : "item-card"}>
      <label className="item-main">
        <input
          type="checkbox"
          checked={book.returned}
          onChange={() => onToggle(book.id)}
        />
        <div>
          <h3>{book.title}</h3>
          {book.borrower && <p className="borrower">Cititor: {book.borrower}</p>}
          <span className={`badge badge-${book.condition}`}>
            Stare: {CONDITION_LABELS[book.condition]}
          </span>
        </div>
      </label>
      <div className="item-actions">
        <span className="status">{book.returned ? "Returnată" : "Împrumutată"}</span>
        <button
          className="btn-danger"
          onClick={() => onDelete(book.id)}
          aria-label={`Șterge ${book.title}`}
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
