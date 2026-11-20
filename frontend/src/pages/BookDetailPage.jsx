import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBook } from "../api.js";
import { CONDITION_LABELS } from "../constants.js";
import Spine from "../components/Spine.jsx";
import Stamp from "../components/Stamp.jsx";
import styles from "./BookDetailPage.module.css";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchBook(id);
        if (!ignore) {
          setBook(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="sheet">
        <p className="info" data-testid="loading">
          Se încarcă cartea…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sheet">
        <section className="panel">
          <p className="error" data-testid="error">
            Cartea nu a putut fi încărcată ({error}).
          </p>
          <Link to="/" className={styles.back}>
            Înapoi la bibliotecă
          </Link>
        </section>
      </div>
    );
  }

  const facts = [
    { label: "Autor", value: book.author },
    { label: "Tip", value: book.type },
    { label: "Gen", value: book.genre },
    { label: "Apărută în", value: book.year },
    { label: "Pagini", value: book.pages },
    { label: "Editura", value: book.publisher },
    { label: "Stare", value: CONDITION_LABELS[book.condition] },
  ].filter((fact) => fact.value);

  return (
    <div className="sheet">
      <section className={`panel ${styles.detail}`} data-testid="detail">
        <Link to="/" className={styles.back}>
          Înapoi la bibliotecă
        </Link>
        <div className={styles.layout}>
          <div className={styles.cover}>
            <Spine book={book} showTitle className={styles.spine} />
          </div>
          <div>
            <h2 className={styles.title} data-testid="detail-title">
              {book.title}
            </h2>
            {book.author && <p className={styles.author}>{book.author}</p>}
            <div className={styles.status}>
              {book.returned ? (
                <p className={styles.home}>Pe raft</p>
              ) : (
                <Stamp borrower={book.borrower} tilt={-3} />
              )}
            </div>
            {book.summary && <p className={styles.summary}>{book.summary}</p>}
            <dl className={styles.fields}>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
