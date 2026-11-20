import { spineCloth, spineWidth } from "../spine.js";
import styles from "./Spine.module.css";

export default function Spine({ book, showTitle, className }) {
  const cloth = styles[spineCloth(book.title)];

  return (
    <span
      className={`${styles.spine} ${cloth} ${className ?? ""}`}
      style={{ "--w": spineWidth(book.pages) }}
      aria-hidden="true"
    >
      <span className={styles.cap}>{book.id}</span>
      {showTitle && <span className={styles.title}>{book.title}</span>}
    </span>
  );
}
