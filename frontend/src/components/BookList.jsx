import BookCard from "./BookCard.jsx";

export default function BookList({ books, emptyText, justLentId, onLend, onToggle, onDelete }) {
  if (books.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        {emptyText}
      </p>
    );
  }

  return (
    <ul className="item-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isNew={book.id === justLentId}
          onLend={onLend}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
