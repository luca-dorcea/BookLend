import { CONDITION_LABELS } from "../conditions.js";

export default function LentCard({ book, isNew, onReturn }) {
  return (
    <li className={isNew ? "item-card is-new" : "item-card"}>
      <div className="item-main">
        <h3>{book.title}</h3>
        {book.borrower && <p className="borrower">Cititor: {book.borrower}</p>}
        <span className={`badge badge-${book.condition}`}>
          Stare: {CONDITION_LABELS[book.condition]}
        </span>
      </div>
      <label className="return-toggle">
        <input
          type="checkbox"
          checked={book.returned}
          onChange={() => onReturn(book.id)}
          aria-label={`Returnată: ${book.title}`}
        />
        Returnată
      </label>
    </li>
  );
}
