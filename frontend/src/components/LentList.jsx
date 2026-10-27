import LentCard from "./LentCard.jsx";

export default function LentList({ books, justLentId, onReturn }) {
  if (books.length === 0) {
    return <p className="empty">Nu ai împrumutat încă nicio carte.</p>;
  }

  return (
    <ul className="item-list">
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
