# Stage 7: AI log

## Tools
- Claude (Claude Code)

## Key requests
### 1. Form and validation
- Asked: to continue the project with the Stage 7 guide.
- Got: `BookForm.jsx`, a controlled form (title, author, type, condition, reader) with `value` and `onChange` on every field, `noValidate` and `e.preventDefault()`. An empty or too long title shows an error in the page and nothing is sent. While saving, the button is disabled and reads "Se salvează…"; the fields are cleared only if the server accepted the book. `api.js` got a common `request` function and `createBook`, `updateBook`, `deleteBook`; App keeps the object the server returns, so the id comes from json-server.
- Changed or rejected: the guide's layout (form left, list right) holds the form and "Cărți împrumutate" on the left and "Biblioteca mea" on the right. New books without a reader get `returned: true`, so they stay on the shelf.

### 2. The automatic checker
- Asked: to add `tw.json` and the `data-testid` attributes from the guide.
- Got: `tw.json` with `resource: books`, `title`, `done: returned` and a sample; the test ids on the form, the library cards, the empty list and the loading and error messages.
- Changed or rejected: the checker clicks delete and expects the book to be gone, so the confirmation dialog from stage 5 was replaced by an immediate delete with an "Anulează" button that adds the book back. The library card got a "Pe raft" checkbox bound to `returned`, the field the checker ticks.

## What I learned / what did not work
A 204 response has no body and `res.json()` fails on it, so `request` returns `null` for a 204.
The form error has to stay in the form, so `handleAdd` lets the error reach `BookForm` instead of catching it in App.
If the server is down, the typed title stays in the field because the fields are only cleared after a successful save.
