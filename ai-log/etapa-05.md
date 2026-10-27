# Stage 5: AI log

## Tools
- Claude (Claude Code)

## Key requests
### 1. State and events
- Asked: to update the project according to the Stage 5 guide.
- Got: the books kept in useState in App, handleToggleReturned (map with a copy of the changed book) and handleDelete (filter), passed through BookList to every BookCard. The card has a checkbox for "returned" and a delete button with an aria-label that names the book. The status text stays next to the button.
- Changed or rejected: kept as given.

### 2. Light and dark mode
- Asked: the theme button from the guide.
- Got: a theme state started from the system setting, a button in the header that writes data-theme on the html element, and CSS rules that redefine the color variables for data-theme="dark" and skip the system dark theme when light was chosen.
- Changed or rejected: on a phone the button covered the title, so under 700px it now sits above the title and the card buttons move to a second row.

### 3. Singular in the counter
- Asked: the singular form in the header counter.
- Got: "1 carte" and "1 împrumutată" when the number is 1, the plural otherwise.
- Changed or rejected: kept as given.

### 4. Icon for the theme button
- Asked: a round sun/moon icon instead of the text on the theme button.
- Got: components/ThemeIcon.jsx, which draws a moon in light mode and a sun in dark mode, and a round 40px button. The text moved to aria-label and title, so screen readers and the tooltip still say "Mod luminos" or "Mod întunecat".
- Changed or rejected: the small button no longer covers the title on a phone, so its phone rule was removed.

### 5. Review against the Web Interface Guidelines
- Asked: to fix the review findings that do not conflict with the stage guides.
- Got: long titles and borrower names now wrap inside the card instead of pushing the delete button off screen, headings use text-wrap: balance, buttons and labels use touch-action: manipulation, and the BookLend title has translate="no".
- Changed or rejected: the checkbox shrank next to a long title, so it got flex-shrink: 0. Findings that would change what the stage guides ask for were left as they are.

### 6. The remaining review findings
- Asked: a preview of the other findings, on a separate branch.
- Got: the delete button asks "Ștergi „<titlu>”?" first, and keyboard focus moves to the list heading after a delete. The checkbox label now holds only the title (inside the h3), and the status text describes it. The theme button keeps the fixed name "Mod întunecat", with aria-pressed saying whether it is on. Also a skip link to the list, a theme-color meta tag, no grey tap highlight, and "de" in the counter from 20 up ("20 de cărți").
- Changed or rejected: "Cărțile mele împrumutate" was kept; it is the approved heading.

### 7. Own confirmation box
- Asked: a confirmation that does not use the browser's default box.
- Got: one <dialog> in App, opened with showModal() from handleDelete. Its two buttons ("Anulează", "Șterge") sit in a form with method="dialog", so the dialog closes by itself and returnValue says which button was pressed. Escape cancels, and the card's "Șterge" button goes back to the guide's onClick={() => onDelete(book.id)}.
- Changed or rejected: returnValue keeps its last value, so handleDelete clears it before opening; otherwise Escape after a delete would delete the next book too.

## What I learned / what did not work
State changes only through setBooks with a new list; changing the old array in place does not update the page.
The counter is computed from the list on every render, so it never needs its own state.
onClick={() => onDelete(book.id)} waits for the click; onClick={onDelete(book.id)} would delete every book during the first render.
useState(initialTheme) gets the function without parentheses, so React calls it only once.
