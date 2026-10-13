# Stage 3: AI log

## Tools
- Claude (claude.ai)

## Key requests
### 1. The React app
- Asked: to update the project according to the Stage 3 guide.
- Got: the stage 1 and 2 files moved to mockup/, the Vite demo files removed, the stage 1 styles in App.css with one column, main.jsx importing App.css, and App.jsx with the three books, the header counter computed from the data and the list printed as JSON.
- Changed or rejected: kept as given.

## What I learned / what did not work
The page no longer opens with a double click: Vite serves it with npm run dev, because the files load each other with import.
node_modules is not committed; npm install recreates it from package.json.
