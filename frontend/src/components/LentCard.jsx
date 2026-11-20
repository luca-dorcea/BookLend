import { Link } from "react-router-dom";
import { CONDITION_LABELS } from "../constants.js";
import styles from "./LentCard.module.css";

export default function LentCard({ book, isNew, onReturn }) {
  return (
    <li className={isNew ? `${styles.slip} ${styles.isNew}` : styles.slip}>
      <h3 className={styles.title}>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h3>
      {book.borrower && (
        <p className={styles.borrower}>
          Cititor: <span className={styles.hand}>{book.borrower}</span>
        </p>
      )}
      <div className={styles.foot}>
        <span className={`badge badge-${book.condition}`}>
          Stare: {CONDITION_LABELS[book.condition].toLowerCase()}
        </span>
        <label className="check">
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
