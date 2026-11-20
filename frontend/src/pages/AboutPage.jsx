import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className="sheet">
      <section className={`panel ${styles.about}`}>
        <h2>Despre BookLend</h2>
        <p>
          BookLend ține evidența cărților pe care le împrumuți prietenilor și familiei:
          cine are fiecare carte, în ce stare a plecat și dacă s-a întors pe raft.
        </p>
        <p>
          Aplicația este construită pas cu pas, pe parcursul semestrului, în cadrul
          proiectului de Tehnologii Web de la Facultatea de Inginerie Industrială și
          Robotică, UNSTPB.
        </p>
        <p>Tehnologii: React, Vite și React Router; datele vin deocamdată de la json-server.</p>
      </section>
    </div>
  );
}
