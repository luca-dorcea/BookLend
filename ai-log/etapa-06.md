# Stage 6: AI log

## Tools
- Claude (Claude Code)

## Key requests
### 1. Data from a mock API
- Asked: to update the project according to the Stage 6 guide.
- Got: json-server 0.17.4 as a dev dependency with the `npm run api` script, `frontend/db.json` with the 30 books under the key `books` (so the route is `/books`), `src/api.js` with `fetchBooks` reading the address from `VITE_API_URL`, `.env.example`, and App loading the books in a `useEffect` with the `ignore` clean-up. The page shows "Se încarcă biblioteca…" while waiting and an error that says to run `npm run api` when the API is down. `books.js` was removed, so the data is no longer in the React code.
- Changed or rejected: the loading and error messages sit above both lists, which only appear once the books have arrived; the grid got `align-content: start` so the message stays at the top of the page.

## What I learned / what did not work
`fetch` only throws when it cannot reach the server; a 404 or 500 still resolves, so `res.ok` has to be checked.
The function given to `useEffect` cannot be `async` itself, so the request goes in an inner `load` function.
In development React mounts the component twice, which is why the Network tab shows two requests to `/books`.
On Windows, stopping `npm run api` with the terminal closed does not always stop json-server; the port has to be free before the error state shows.
