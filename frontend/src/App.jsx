import BookList from "./components/BookList.jsx";

const books = [
  { id: 1, title: "Enigma Otiliei", returned: false, condition: "good", borrower: "Ana" },
  { id: 2, title: "Maitreyi", returned: true, condition: "new", borrower: "Mihai" },
  { id: 3, title: "Ion", returned: false, condition: "worn", borrower: "Ioana" },
];

export default function App() {
  const lent = books.filter((b) => !b.returned).length;

  return (
    <>
      <header className="app-header">
        <h1>BookLend</h1>
        <p>Ține evidența cărților împrumutate prietenilor și familiei.</p>
        <p className="app-count">
          {books.length} cărți, dintre care {lent} împrumutate
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>Cărțile mele împrumutate</h2>
          <BookList books={books} />
        </section>
      </main>
    </>
  );
}
