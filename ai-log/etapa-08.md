# Stage 8: AI log

## Tools
- Claude (Claude Code)

## Key requests
### 1. Visual redesign
- Asked: to make the page look less generic and more lively, on a separate branch.
- Got: book spines drawn from the data (`spine.js`, `Spine.jsx`): the color comes from the title, the width from the number of pages. A shelf at the top shows every book, and a lent book leaves a gap with a slip holding the reader's name (`Shelf.jsx`). Lent books are paper slips with the name in handwriting. Three fonts are bundled with npm (Besley, Alegreya Sans, Playwrite RO). The repeated bookcase picture became side shelves.
- Changed or rejected: the bookcase, the lamp, the stamp, the beige day and walnut night themes stay, as I asked for them earlier. Every `data-testid` from stage 7 stays on the same element.

### 2. Routing, detail page and CSS Modules
- Asked: to continue the project with the Stage 8 guide, keeping the new design.
- Got: `react-router-dom` with `BrowserRouter` in `main.jsx`; `App.jsx` holds only the route map; `components/Layout.jsx` has the header, the `NavLink` navigation (`data-testid="nav"`), the `Outlet` and the footer. The list page moved to `pages/LibraryPage.jsx`. The title in each row is a `Link` to `/books/:id` (`data-testid="item-link"`), the route named after `resource` in `tw.json`. `pages/BookDetailPage.jsx` reads the id with `useParams` and loads it with `fetchBook(id)`; a missing id shows an error and a way back. `AboutPage` and `NotFoundPage` (`data-testid="not-found"`) complete the pages. `App.css` became `index.css` with the variables and shared classes only; every component has its own `.module.css`. The condition labels and the book types moved to `constants.js`.
- Changed or rejected: the "Detalii" section was removed from the rows, because the detail page now shows that information. The counter stays under the shelf on the library page. The theme button moved into the layout, since every page shares it. For GitHub Pages, the router gets `basename={import.meta.env.BASE_URL}` and the workflow builds with `--base=/BookLend/` and copies `index.html` to `404.html`, so links like `/books/3` also work there.

## What I learned / what did not work
`useParams` always returns text, so the id from the address is `"3"`, not `3`; here it only goes into the URL of the request, so no conversion is needed.
The effect of the detail page depends on `[id]`, so going from one book to another loads the new book without remounting the page.
With CSS Modules a parent cannot reach a class inside a child component, so `Spine` takes a `className` from its parent, and the parent sizes it with a more specific selector (`.book .spine`).
On a static server a deep link like `/books/3` has no file behind it; a 404.html copy of the page lets the router take over.
