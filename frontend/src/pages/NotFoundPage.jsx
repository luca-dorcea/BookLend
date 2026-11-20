import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className="sheet">
      <section className={`panel ${styles.notFound}`} data-testid="not-found">
        <h2>Pagina nu există</h2>
        <p className="info">Adresa cerută nu duce la niciun raft.</p>
        <Link to="/" className={styles.back}>
          Înapoi la bibliotecă
        </Link>
      </section>
    </div>
  );
}
