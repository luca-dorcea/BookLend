import Spine from "./Spine.jsx";
import { spineHeight, spineWidth } from "../spine.js";

const ROW_SIZE = 36;

export default function Shelf({ books }) {
  const rows = [];
  for (let start = 0; start < books.length; start += ROW_SIZE) {
    rows.push(books.slice(start, start + ROW_SIZE));
  }
  if (rows.length === 0) rows.push([]);

  return (
    <div className="shelf" aria-hidden="true">
      {rows.map((row, index) => (
        <div key={index} className="shelf-bay">
          <div className="shelf-row">
            {row.map((book) => (
              <span
                key={book.id}
                className={book.returned ? "shelf-book" : "shelf-book is-lent"}
                style={{ "--w": spineWidth(book.pages), "--h": spineHeight(book.title) }}
              >
                <Spine book={book} showTitle />
                <span className="shelf-slip">
                  <span className="slip-name">{book.borrower}</span>
                </span>
              </span>
            ))}
          </div>
          <div className="shelf-board" />
        </div>
      ))}
    </div>
  );
}
