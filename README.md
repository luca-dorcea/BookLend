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

Open `index.html` in a browser. No build step, no server.

## AI usage

| Tool   | Used for                                                          |
| ------ | ----------------------------------------------------------------- |
| Claude | drafting the README, HTML/CSS mockup (stage 1), data functions and console tests (stage 2) |

Details per stage: see the `ai-log/` folder.

## Stage 2: data logic

Plain JavaScript, no DOM. `books.js` holds the array and the functions
that read and change it. Results are printed in the browser console (F12).

Functions: `listTitles`, `countLent`, `searchBooks` (title or borrower), `nextId`,
`addBook` (with validation), `toggleReturned`, `deleteBook`. None of them changes the list it receives.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [ ] Stage 3: Vite and React project

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
