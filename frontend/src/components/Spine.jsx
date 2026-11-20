import { spineAuthor, spineCloth, spineWidth } from "../spine.js";
import styles from "./Spine.module.css";

export default function Spine({ book, showTitle, className }) {
  const cloth = styles[spineCloth(book.title)];
  const textClass = book.title.length > 16 ? `${styles.text} ${styles.long}` : styles.text;

  return (
    <span
      className={`${styles.spine} ${cloth} ${className ?? ""}`}
      style={{ "--w": spineWidth(book.pages) }}
      aria-hidden="true"
    >
      <span className={styles.cap}>{book.id}</span>
      {showTitle && (
        <span className={textClass}>
          <span className={styles.title}>{book.title}</span>
          {book.author && <span className={styles.author}>{spineAuthor(book.author)}</span>}
        </span>
      )}
    </span>
  );
}
