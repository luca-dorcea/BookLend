# Stage 9: AI log

## Tools
- Claude (Claude Code)

## Key requests
### 1. Own backend with Express
- Asked: to continue the project with the Stage 9 guide.
- Got: `backend/` with Express 5 and cors. `src/server.js` only starts the server; `src/app.js` has `cors()` limited to `CORS_ORIGIN`, `express.json()`, `/health`, the `/books` router, a 404 for unknown routes and the error handler with four parameters. `src/routes/books.js` has the five routes (GET list, GET one, POST, PATCH, DELETE) and `findIndex`, which answers 400 for a bad id and 404 for a missing book. `src/validation.js` checks the title, the condition (`new`, `good`, `worn`, the same values as `constants.js` in the frontend), `returned`, the text fields with their maximum lengths and the numbers, and keeps only known fields. The 30 books start from `src/data.js` and stay in memory.
- Changed or rejected: the error messages are the Romanian ones from stage 2 ("Titlul nu poate fi gol", "Stare invalidă: ..."), without a final period, because the frontend adds its own. A body that is not valid JSON gets a Romanian message instead of the parser's English one. In the frontend, `request()` now shows the server's `error` text; `db.json`, the `api` script and json-server were removed, and the hint under the loading error now points to `npm run dev` in `backend`.

## What I learned / what did not work
Ports 5173 and 3001 are different origins, so the browser blocks the answers unless the server sends `Access-Control-Allow-Origin`; this cannot be fixed from the frontend.
The order in `app.js` matters: middleware first, then the routes, then the 404, and the error handler last.
Express knows the error handler only by its four parameters, so `next` stays even if it is not used.
The server ignores the `id` it receives, so "Anulează" after a delete brings the book back with a new number at the end of the list.
In Git Bash on Windows, letters like "ă" typed in a curl command can arrive without the diacritic; the page sends them correctly.
