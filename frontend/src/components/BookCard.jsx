const CONDITION_LABELS = { new: "nouă", good: "bună", worn: "uzată" };

export default function BookCard({ book }) {
  return (
    <li className={book.returned ? "item-card done" : "item-card"}>
      <div>
        <h3>{book.title}</h3>
        {book.borrower && <p className="borrower">Cititor: {book.borrower}</p>}
        <span className={`badge badge-${book.condition}`}>
          Stare: {CONDITION_LABELS[book.condition]}
        </span>
      </div>
      <span className="status">{book.returned ? "Returnată" : "Împrumutată"}</span>
    </li>
  );
}
