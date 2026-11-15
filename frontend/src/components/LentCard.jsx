import { CONDITION_LABELS } from "../conditions.js";

export default function LentCard({ book, isNew, onReturn }) {
  return (
    <li className={isNew ? "item-card lent-slip is-new" : "item-card lent-slip"}>
      <h3>{book.title}</h3>
      {book.borrower && (
        <p className="borrower">
          Cititor: <span className="slip-hand">{book.borrower}</span>
        </p>
      )}
      <div className="slip-foot">
        <span className={`badge badge-${book.condition}`}>
          Stare: {CONDITION_LABELS[book.condition]}
        </span>
        <label className="return-toggle">
          <input
            type="checkbox"
            checked={book.returned}
            onChange={() => onReturn(book.id)}
            aria-label={`Returnată: ${book.title}`}
          />
          Returnată
        </label>
      </div>
    </li>
  );
}
