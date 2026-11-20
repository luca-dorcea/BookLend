import { toDative } from "../dative.js";
import styles from "./Stamp.module.css";

export default function Stamp({ borrower, tilt, isNew }) {
  return (
    <span
      className={isNew ? `${styles.stamp} ${styles.isNew}` : styles.stamp}
      style={{ "--tilt": `${tilt}deg` }}
    >
      Împrumutată
      {borrower && <span className={styles.name}>{toDative(borrower)}</span>}
    </span>
  );
}
