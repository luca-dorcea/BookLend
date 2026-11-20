import { Link } from "react-router-dom";
import { CONDITION_LABELS } from "../constants.js";
import Spine from "./Spine.jsx";
import Stamp from "./Stamp.jsx";
import styles from "./BookCard.module.css";

export default function BookCard({ book, isNew, onLend, onToggle, onDelete }) {
  const isLent = !book.returned;

  return (
    <li className={styles.card} data-testid="item" data-id={book.id}>
      <span className={styles.slot}>
        <Spine book={book} />
      </span>
      <div className={styles.main}>
        <h3 className={styles.heading}>
          <Link to={`/books/${book.id}`} className={styles.title} data-testid="item-link">
            {book.title}
          </Link>
        </h3>
        <div className={styles.meta}>
          {book.author && <p className={styles.author}>{book.author}</p>}
          <span className={`badge badge-${book.condition}`}>
            Stare: {CONDITION_LABELS[book.condition].toLowerCase()}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        {isLent ? (
          <Stamp borrower={book.borrower} tilt={-2 - (book.id % 4)} isNew={isNew} />
        ) : (
          <button
            className="btn btn-outline"
            onClick={() => onLend(book.id)}
            aria-label={`Împrumută ${book.title}`}
          >
            Împrumută
          </button>
        )}
        <label className="check">
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
          className="btn btn-quiet-danger"
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
