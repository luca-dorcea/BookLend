import BookCard from "./BookCard.jsx";

export default function BookList({ books, emptyText, justLentId, onLend, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">{emptyText}</p>;
  }

  return (
    <ul className="item-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isNew={book.id === justLentId}
          onLend={onLend}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
