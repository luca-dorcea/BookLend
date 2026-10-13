const books = [
  { id: 1, title: "Enigma Otiliei", returned: false, condition: "good", borrower: "Ana" },
  { id: 2, title: "Maitreyi", returned: true, condition: "new", borrower: "Mihai" },
  { id: 3, title: "Ion", returned: false, condition: "worn", borrower: "Ioana" },
];

const CONDITIONS = ["new", "good", "worn"];
const MAX_TITLE = 100;
const MAX_BORROWER = 50;

function listTitles(list) {
  return list.map((b) => b.title);
}

function countLent(list) {
  return list.filter((b) => !b.returned).length;
}

function searchBooks(list, text) {
  const query = text.trim().toLowerCase();
  return list.filter(
    (b) => b.title.toLowerCase().includes(query) || b.borrower.toLowerCase().includes(query)
  );
}

function nextId(list) {
  return list.reduce((max, b) => Math.max(max, b.id), 0) + 1;
}

function addBook(list, title, condition = "good", borrower = "") {
  const cleanTitle = title.trim();
  const cleanBorrower = borrower.trim();

  if (cleanTitle === "") {
    console.log("Titlul nu poate fi gol.");
    return list;
  }
  if (cleanTitle.length > MAX_TITLE) {
    console.log(`Titlul poate avea cel mult ${MAX_TITLE} de caractere.`);
    return list;
  }
  if (cleanBorrower.length > MAX_BORROWER) {
    console.log(`Numele cititorului poate avea cel mult ${MAX_BORROWER} de caractere.`);
    return list;
  }
  if (!CONDITIONS.includes(condition)) {
    console.log("Stare invalidă:", condition);
    return list;
  }

  const book = {
    id: nextId(list),
    title: cleanTitle,
    returned: false,
    condition: condition,
    borrower: cleanBorrower,
  };
  return [...list, book];
}

function toggleReturned(list, id) {
  return list.map((b) => (b.id === id ? { ...b, returned: !b.returned } : b));
}

function deleteBook(list, id) {
  return list.filter((b) => b.id !== id);
}

console.log("--- Citire ---");
console.log("Titluri:", listTitles(books).join(", "));
console.log("Împrumutate:", countLent(books));
console.log("Căutare 'ENIGMA':", listTitles(searchBooks(books, "ENIGMA")).join(", "));
console.log("Căutare 'ana' (titlu sau cititor):", listTitles(searchBooks(books, "ana")).join(", "));

console.log("--- Adăugare ---");
let list = addBook(books, "Baltagul", "good", "Radu");
console.log("Lista nouă:", list.length, "cărți");
console.log("Originalul a rămas cu:", books.length, "cărți");

console.log("--- Modificare și ștergere ---");
list = toggleReturned(list, 1);
console.log("După returnarea id 1, împrumutate:", countLent(list));
list = deleteBook(list, 3);
console.log("După ștergerea id 3:", listTitles(list).join(", "));
list = addBook(list, "Moromeții", "worn");
console.log("Id-ul cărții adăugate după ștergere:", list[list.length - 1].id);

console.log("--- Validare ---");
addBook(list, "x".repeat(101));
addBook(list, "Ceva", "good", "y".repeat(51));
addBook(list, "   ");
addBook(list, "Ceva", "perfect");
