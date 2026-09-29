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
| borrower  | text         | optional, the person who borrowed the book   |

Sample data used across all stages:

1. Enigma Otiliei, active (lent), good
2. Maitreyi, done (returned), new
3. Ion, active (lent), worn

## How to run

Open `index.html` in a browser. No build step, no server.

## AI usage

| Tool   | Used for                                                          |
| ------ | ----------------------------------------------------------------- |
| Claude | drafting the README, stage 1          |

Details per stage: see the `ai-log/` folder.

## Status

- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript

## Stage 1 checklist

| ID    | Requirement                                          | Where (permalink)              | How to check        |
| ----- | ---------------------------------------------------- | ------------------------------ | ------------------- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](link)              | read                |
| S1-R2 | AI usage section                                     | [README.md](link)              | read                |
| S1-R3 | AI log for stage 1                                   | [ai-log/etapa-01.md](link)     | read                |
| S1-R4 | header, form (text + select), 3 cards with own data  | [index.html#L..-L..](link)     | open the page       |
| S1-R5 | finished card looks different                        | [style.css#L.. (.done)](link)  | look at the card    |
| S1-R6 | 2 columns on desktop, 1 under 700px                  | [style.css#L.. (@media)](link) | resize < 700px      |
| S1-R7 | visible focus, readable dark theme                   | [style.css#L..](link)          | Tab; dark mode      |
| S1-R8 | commit "Stage 1" pushed                              | [commit](link)                 | commit history      |