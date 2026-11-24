import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta nu există" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Corpul cererii nu este JSON valid" });
  }
  res.status(status).json({ error: status === 500 ? "Eroare internă" : err.message });
});

export default app;
