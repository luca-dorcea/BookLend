import Spine from "./Spine.jsx";
import { spineHeight, spineWidth } from "../spine.js";
import styles from "./Bookcase.module.css";

const LEFT_SHELVES = [
  ["doină", "baladă", "pastel", "fabulă", "nuvelă", "roman", "schiță", "epopee"],
  ["odă", "legendă", "basm", "snoavă", "satiră", "poem", "cronică", "elegie"],
  ["jurnal", "memorii", "eseu", "dramă", "comedie", "idilă", "sonet", "rondel"],
  ["psalm", "imn", "gazel", "glosă", "epistolă", "meditație", "pamflet", "parabolă"],
];

const RIGHT_SHELVES = [
  ["teatru", "versuri", "proză", "critică", "istorie", "atlas", "dicționar", "almanah"],
  ["călătorii", "scrisori", "povești", "amintiri", "cugetări", "studii", "note", "opere"],
  ["antologie", "tratat", "manual", "ghid", "album", "caiet", "culegere", "lexicon"],
  ["mituri", "cântece", "colinde", "proverbe", "ghicitori", "zicători", "bocete", "strigături"],
];

function sideBook(word) {
  return { title: word, pages: 100 + word.length * 60 };
}

function SideShelves({ side, shelves }) {
  return (
    <div className={`${styles.side} ${side}`}>
      {shelves.map((words) => (
        <div key={words[0]} className={styles.shelf}>
          <div className={styles.row}>
            {words.map(sideBook).map((book) => (
              <span
                key={book.title}
                className={styles.book}
                style={{ "--w": spineWidth(book.pages), "--h": spineHeight(book.title) }}
              >
                <Spine book={book} className={styles.spine} />
              </span>
            ))}
          </div>
          <div className={styles.board} />
        </div>
      ))}
    </div>
  );
}

export default function Bookcase() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <SideShelves side={styles.left} shelves={LEFT_SHELVES} />
      <SideShelves side={styles.right} shelves={RIGHT_SHELVES} />
    </div>
  );
}
