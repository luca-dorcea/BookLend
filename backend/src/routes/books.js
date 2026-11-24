import { Router } from "express";
import { INITIAL_BOOKS } from "../data.js";
import { parseId, validateBook } from "../validation.js";

const router = Router();

const books = [...INITIAL_BOOKS];
let nextId = Math.max(...books.map((b) => b.id)) + 1;

function findIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Cartea nu există" });
  }
  return index;
}

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const index = findIndex(req, res);
  if (index === -1) return;
  res.json(books[index]);
});

router.post("/", (req, res) => {
  const { errors, data } = validateBook(req.body ?? {});
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join("; ") });
  }
  const book = { id: nextId++, ...data };
  books.push(book);
  res.status(201).json(book);
});

router.patch("/:id", (req, res) => {
  const index = findIndex(req, res);
  if (index === -1) return;
  const { errors, data } = validateBook(req.body ?? {}, { partial: true });
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join("; ") });
  }
  books[index] = { ...books[index], ...data };
  res.json(books[index]);
});

router.delete("/:id", (req, res) => {
  const index = findIndex(req, res);
  if (index === -1) return;
  books.splice(index, 1);
  res.status(204).end();
});

export default router;
