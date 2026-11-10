export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export function fetchBooks() {
  return request("/books");
}

export function createBook(book) {
  return request("/books", { method: "POST", body: JSON.stringify(book) });
}

export function updateBook(id, changes) {
  return request(`/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteBook(id) {
  return request(`/books/${id}`, { method: "DELETE" });
}
