import LentCard from "./LentCard.jsx";
import styles from "./LentList.module.css";

export default function LentList({ books, emptyText, justLentId, onReturn }) {
  if (books.length === 0) {
    return <p className="empty">{emptyText}</p>;
  }

  return (
    <ul className={styles.list}>
      {books.map((book) => (
        <LentCard
          key={book.id}
          book={book}
          isNew={book.id === justLentId}
          onReturn={onReturn}
        />
      ))}
    </ul>
  );
}
