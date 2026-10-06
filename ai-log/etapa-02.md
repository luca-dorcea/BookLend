# Stage 2: AI log

## Tools
- Claude (claude.ai)

## Key requests
### 1. Data functions
- Asked: to update the project according to the Stage 2 guide.
- Got: books.js with the three sample books, the CONDITIONS list and functions for listing, counting, searching (title or borrower), adding with validation, toggling and deleting, all returning new lists.
- Changed or rejected: removed the comments from the code.

### 2. Console tests
- Asked: tests grouped by section, as in the guide.
- Got: the sections Citire, Adăugare, Modificare și ștergere and Validare, plus a test showing that a book added after a delete gets a new id.
- Changed or rejected: kept as given.

## What I learned / what did not work
The functions return new lists with the spread operator instead of changing the original, which React needs from Stage 5.
The next id has to be the largest id plus one; list.length + 1 repeats an id after a delete.
