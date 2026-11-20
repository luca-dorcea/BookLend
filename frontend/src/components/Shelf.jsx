import Spine from "./Spine.jsx";
import { spineHeight, spineWidth } from "../spine.js";
import styles from "./Shelf.module.css";

const ROW_SIZE = 36;

export default function Shelf({ books }) {
  const rows = [];
  for (let start = 0; start < books.length; start += ROW_SIZE) {
    rows.push(books.slice(start, start + ROW_SIZE));
  }
  if (rows.length === 0) rows.push([]);

  return (
    <div className={styles.shelf} aria-hidden="true">
      {rows.map((row, index) => (
        <div key={index}>
          <div className={styles.row}>
            {row.map((book) => (
              <span
                key={book.id}
                className={book.returned ? styles.book : `${styles.book} ${styles.lent}`}
                style={{ "--w": spineWidth(book.pages), "--h": spineHeight(book.title) }}
              >
                <Spine book={book} showTitle className={styles.spine} />
                <span className={styles.slip}>
                  <span className={styles.name}>{book.borrower}</span>
                </span>
              </span>
            ))}
          </div>
          <div className={styles.board} />
        </div>
      ))}
    </div>
  );
}
