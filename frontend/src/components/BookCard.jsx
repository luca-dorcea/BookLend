const CONDITION_LABELS = { new: "nouă", good: "bună", worn: "uzată" };

export default function BookCard({ book, onToggle, onDelete }) {
  return (
    <li className={book.returned ? "item-card done" : "item-card"}>
      <div className="item-main">
        <h3>
          <label className="item-title">
            <input
              type="checkbox"
              checked={book.returned}
              onChange={() => onToggle(book.id)}
              aria-describedby={`status-${book.id}`}
            />
            {book.title}
          </label>
        </h3>
        {book.borrower && <p className="borrower">Cititor: {book.borrower}</p>}
        <span className={`badge badge-${book.condition}`}>
          Stare: {CONDITION_LABELS[book.condition]}
        </span>
      </div>
      <div className="item-actions">
        <span className="status" id={`status-${book.id}`}>
          {book.returned ? "Returnată" : "Împrumutată"}
        </span>
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
