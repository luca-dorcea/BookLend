import Spine from "./Spine.jsx";
import { spineHeight, spineWidth } from "../spine.js";

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
    <div className={`case-side case-${side}`}>
      {shelves.map((words) => (
        <div key={words[0]} className="side-shelf">
          <div className="side-row">
            {words.map(sideBook).map((book) => (
              <span
                key={book.title}
                className="shelf-book"
                style={{ "--w": spineWidth(book.pages), "--h": spineHeight(book.title) }}
              >
                <Spine book={book} />
              </span>
            ))}
          </div>
          <div className="shelf-board" />
        </div>
      ))}
    </div>
  );
}

export default function Bookcase() {
  return (
    <div className="bookcase">
      <SideShelves side="left" shelves={LEFT_SHELVES} />
      <SideShelves side="right" shelves={RIGHT_SHELVES} />
    </div>
  );
}
