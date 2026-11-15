import { spineCloth, spineWidth } from "../spine.js";

export default function Spine({ book, height, showTitle }) {
  return (
    <span
      className={`book-spine cloth-${spineCloth(book.title)}`}
      style={{ width: spineWidth(book.pages), height }}
      aria-hidden="true"
    >
      <span className="spine-cap">{book.id}</span>
      {showTitle && <span className="spine-title">{book.title}</span>}
    </span>
  );
}
