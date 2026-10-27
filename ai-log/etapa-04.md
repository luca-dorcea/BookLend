# Stage 4: AI log

## Tools
- Claude (Claude Code)

## Key requests
### 1. List components
- Asked: to update the project according to the Stage 4 guide.
- Got: components/BookCard.jsx for one book and components/BookList.jsx for the whole list, with the mockup's classes, the condition labels kept apart from the data, key={book.id} and the empty-list message. App.jsx passes the books to BookList instead of printing JSON.
- Changed or rejected: kept as given.

## What I learned / what did not work
A component only shows what it receives through props, so the same BookCard is used for every book.
The key goes on the component returned from map and uses the id, not the position in the list.
Without key, React prints the warning "Each child in a list should have a unique key prop" in the console.
