import { CONDITION_LABELS } from "../conditions.js";
import { toDative } from "../dative.js";

export default function BookCard({ book, isNew, onLend, onToggle, onDelete }) {
  const isLent = !book.returned;
  const facts = [
    { label: "Tip", value: book.type },
    { label: "Gen", value: book.genre },
    { label: "Apărută în", value: book.year },
    { label: "Pagini", value: book.pages },
    { label: "Editura", value: book.publisher },
  ].filter((fact) => fact.value);

  return (
    <li
      className={isLent ? "item-card lent" : "item-card"}
      data-testid="item"
      data-id={book.id}
    >
      <div className="item-main">
        <h3 data-testid="item-title">{book.title}</h3>
        {book.author && <p className="author">{book.author}</p>}
        <span className={`badge badge-${book.condition}`}>
          Stare: {CONDITION_LABELS[book.condition]}
        </span>
        {(book.summary || facts.length > 0) && (
          <details className="item-details">
            <summary aria-label={`Detalii despre ${book.title}`}>
              Detalii
              <svg
                className="details-chevron"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            {book.summary && <p className="item-summary">{book.summary}</p>}
            {facts.length > 0 && (
              <dl className="item-facts">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </details>
        )}
      </div>
      <div className="item-actions">
        {isLent ? (
          <span className={isNew ? "stamp is-new" : "stamp"}>
            Împrumutată
            {book.borrower && <span className="stamp-name">{toDative(book.borrower)}</span>}
          </span>
        ) : (
          <button
            className="btn-outline"
            onClick={() => onLend(book.id)}
            aria-label={`Împrumută ${book.title}`}
          >
            Împrumută
          </button>
        )}
        <label className="return-toggle">
          <input
            type="checkbox"
            checked={book.returned}
            onChange={() => onToggle(book.id)}
            aria-label={`Pe raft: ${book.title}`}
            data-testid="item-toggle"
          />
          Pe raft
        </label>
        <button
          className="btn-quiet-danger"
          onClick={() => onDelete(book.id)}
          aria-label={`Șterge ${book.title}`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
