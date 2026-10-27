import BookCard from "./BookCard.jsx";

export default function BookList({ books, onLend, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">Nu ai nicio carte în bibliotecă.</p>;
  }

  return (
    <ul className="item-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onLend={onLend}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
