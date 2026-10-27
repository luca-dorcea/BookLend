# BookLend

BookLend helps readers keep track of the books they lend to friends and family.
It shows who has each book, in what condition it left, and whether it has been returned.

## Data model

| Field     | Type         | Notes                                        |
| --------- | ------------ | -------------------------------------------- |
| title     | text         | required, max 100 chars                      |
| returned  | boolean      | toggled from the list, default false         |
| condition | fixed values | new, good, worn                              |
| category  | relation     | Novel, Poetry, Non-fiction                   |
| user      | relation     | the owner of the book (from week 11)         |
| borrower  | text         | optional, max 50 chars, who borrowed it      |

Sample data used across all stages:

1. Enigma Otiliei, active (lent), good, borrower Ana
2. Maitreyi, done (returned), new, borrower Mihai
3. Ion, active (lent), worn, borrower Ioana

## How to run

```
cd frontend
npm install
npm run dev
```

Then open the address printed in the terminal (http://localhost:5173).
The static mockup from stages 1 and 2 is in `mockup/`.

Online version, rebuilt by GitHub Actions on every push: https://luca-dorcea.github.io/BookLend/
(the mockup: https://luca-dorcea.github.io/BookLend/mockup/).

## AI usage

| Tool   | Used for                                                          |
| ------ | ----------------------------------------------------------------- |
| Claude | drafting the README, HTML/CSS mockup (stage 1), data functions and console tests (stage 2), React app setup (stage 3), list components (stage 4), state, events and theme toggle (stage 5) |

Details per stage: see the `ai-log/` folder.

## Stage 2: data logic

Plain JavaScript, no DOM. `mockup/books.js` holds the array and the functions
that read and change it. Results are printed in the browser console (F12).

Functions: `listTitles`, `countLent`, `searchBooks` (title or borrower), `nextId`,
`addBook` (with validation), `toggleReturned`, `deleteBook`. None of them changes the list it receives.

## Stage 3: Vite and React project

The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the list is still printed raw.

## Stage 4: components

The list is rendered from the data, through two components:
- `BookList` receives the whole array and renders one card per item
- `BookCard` receives a single item through props and displays it

## Stage 5: local state and events

The list lives in React state. Marking a book as returned and deleting it work from the page,
and the counter in the header follows automatically. A button in the header switches
between light and dark mode. Changes are lost on refresh, which is what stage 6 and stage 10 fix.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

## Stage 1 checklist

| ID    | Requirement                                          | Where (permalink) | How to check |
| ----- | ---------------------------------------------------- | ----------------- | ------------ |
| S1-R1 | README: description, fields, sample data, how to run | [README.md#L1-L25](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/README.md#L1-L25) | read |
| S1-R2 | AI usage section                                     | [README.md#L27-L33](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/README.md#L27-L33) | read |
| S1-R3 | AI log for stage 1                                   | [ai-log/etapa-01.md](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data  | [index.html#L10-L67](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/index.html#L10-L67) | open the page |
| S1-R5 | finished card looks different                        | [style.css#L157-L160 (.done)](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/style.css#L157-L160) | look at the Maitreyi card |
| S1-R6 | 2 columns on desktop, 1 under 700px                  | [style.css#L51-L59 (grid)](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/style.css#L51-L59), [style.css#L205-L207 (@media)](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/style.css#L205-L207) | resize < 700px |
| S1-R7 | visible focus, readable dark theme                   | [style.css#L187-L190 (focus)](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/style.css#L187-L190), [style.css#L192-L203 (dark)](https://github.com/luca-dorcea/BookLend/blob/9343cba4fa2daf31323be531dd91a9651a32bb8d/style.css#L192-L203) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed                              | [commit 9343cba](https://github.com/luca-dorcea/BookLend/commit/9343cba4fa2daf31323be531dd91a9651a32bb8d) | commit history |

## Stage 2 checklist

| ID    | Requirement                                   | Where (permalink) | How to check |
| ----- | --------------------------------------------- | ----------------- | ------------ |
| S2-R1 | JS file linked, logs on page load             | [index.html#L70 (script)](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/index.html#L70) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag            | [books.js#L1-L9](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/books.js#L1-L9) | read |
| S2-R3 | list, count, search, add, toggle, delete      | [books.js#L11-L67](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/books.js#L11-L67), [tests #L69-L92](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/books.js#L69-L92) | console output |
| S2-R4 | add rejects empty name and invalid tag        | [books.js#L30-L59 (addBook)](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/books.js#L30-L59), [tests #L88-L92](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/books.js#L88-L92) | Validare section, last 4 console lines |
| S2-R5 | original array unchanged after add            | [books.js#L78](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/books.js#L78) | "Originalul a rămas cu: 3 cărți" |
| S2-R6 | README Stage 2 section + AI log               | [README.md#L35-L41](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/README.md#L35-L41), [ai-log/etapa-02.md](https://github.com/luca-dorcea/BookLend/blob/fe97e73cf34e22c098039f79e6c22ffc13cc4384/ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed                       | [commit fe97e73](https://github.com/luca-dorcea/BookLend/commit/fe97e73cf34e22c098039f79e6c22ffc13cc4384) | commit history |

## Stage 3 checklist

| ID    | Requirement                              | Where (permalink) | How to check |
| ----- | ---------------------------------------- | ----------------- | ------------ |
| S3-R1 | npm run dev starts without errors        | [frontend/package.json#L6-L11 (scripts)](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/frontend/package.json#L6-L11) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data  | [frontend/src/App.jsx#L8-L18](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/frontend/src/App.jsx#L8-L18) | edit data, save |
| S3-R3 | data from README, not from the example   | [frontend/src/App.jsx#L1-L5](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/frontend/src/App.jsx#L1-L5) | compare with README |
| S3-R4 | stage 1 styles reused                    | [frontend/src/App.css](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/frontend/src/App.css), [main.jsx#L3 (import)](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/frontend/src/main.jsx#L3) | look at the page |
| S3-R5 | node_modules ignored, build passes       | [frontend/.gitignore#L10-L11](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/frontend/.gitignore#L10-L11) | npm run build |
| S3-R6 | README Stage 3 section + AI log          | [README.md#L50-L53](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/README.md#L50-L53), [ai-log/etapa-03.md](https://github.com/luca-dorcea/BookLend/blob/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a/ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed                  | [commit 009fe8c](https://github.com/luca-dorcea/BookLend/commit/009fe8c79ee267e9289cebeacc900a8f2eb4ce0a) | commit history |

## Stage 4 checklist

| ID    | Requirement                              | Where (permalink) | How to check |
| ----- | ---------------------------------------- | ----------------- | ------------ |
| S4-R1 | 2+ components in src/components/         | [frontend/src/components/](https://github.com/luca-dorcea/BookLend/tree/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/frontend/src/components) | open folder |
| S4-R2 | card receives data through props         | [BookCard.jsx#L3-L13](https://github.com/luca-dorcea/BookLend/blob/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/frontend/src/components/BookCard.jsx#L3-L13) | read |
| S4-R3 | map + key={id}, no console warnings      | [BookList.jsx#L9-L13](https://github.com/luca-dorcea/BookLend/blob/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/frontend/src/components/BookList.jsx#L9-L13) | F12, Console |
| S4-R4 | message for empty list                   | [BookList.jsx#L4-L6](https://github.com/luca-dorcea/BookLend/blob/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/frontend/src/components/BookList.jsx#L4-L6) | set array to [] |
| S4-R5 | state changes the card look              | [BookCard.jsx#L5 (.done)](https://github.com/luca-dorcea/BookLend/blob/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/frontend/src/components/BookCard.jsx#L5), [#L13 (status)](https://github.com/luca-dorcea/BookLend/blob/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/frontend/src/components/BookCard.jsx#L13) | toggle a returned flag |
| S4-R6 | README Stage 4 section + AI log          | [README.md#L58-L62](https://github.com/luca-dorcea/BookLend/blob/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/README.md#L58-L62), [ai-log/etapa-04.md](https://github.com/luca-dorcea/BookLend/blob/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c/ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed                  | [commit dfd8a77](https://github.com/luca-dorcea/BookLend/commit/dfd8a77cbf50ad424c6bd3aa90daab1dd49fa73c) | commit history |
