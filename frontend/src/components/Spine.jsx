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
      <span className={styles.band} />
      <span className={styles.title}>{showTitle && book.title}</span>
      <span className={styles.band} />
      <span className={styles.emblem} />
    </span>
  );
}
