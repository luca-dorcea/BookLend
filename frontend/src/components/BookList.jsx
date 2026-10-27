import BookCard from "./BookCard.jsx";

export default function BookList({ books, onToggle, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">Nu ai împrumutat încă nicio carte.</p>;
  }

  return (
    <ul className="item-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
