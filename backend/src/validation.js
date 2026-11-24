export const CONDITIONS = ["new", "good", "worn"];
const MAX_TITLE = 100;

const TEXT_FIELDS = [
  { name: "borrower", label: "Numele cititorului", max: 50 },
  { name: "author", label: "Numele autorului", max: 60 },
  { name: "type", label: "Tipul", max: 30 },
  { name: "genre", label: "Genul", max: 40 },
  { name: "publisher", label: "Editura", max: 60 },
  { name: "summary", label: "Rezumatul", max: 1000 },
];

const NUMBER_FIELDS = [
  { name: "year", label: "Anul" },
  { name: "pages", label: "Numărul de pagini" },
];

export function validateBook(body, { partial = false } = {}) {
  const errors = [];
  const data = {};

  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || body.title.trim() === "") {
      errors.push("Titlul nu poate fi gol");
    } else if (body.title.trim().length > MAX_TITLE) {
      errors.push(`Titlul poate avea cel mult ${MAX_TITLE} de caractere`);
    } else {
      data.title = body.title.trim();
    }
  }

  if (!partial || body.condition !== undefined) {
    const condition = body.condition ?? "good";
    if (!CONDITIONS.includes(condition)) {
      errors.push(`Stare invalidă: ${condition}`);
    } else {
      data.condition = condition;
    }
  }

  if (body.returned !== undefined) {
    if (typeof body.returned !== "boolean") {
      errors.push("Câmpul returned trebuie să fie true sau false");
    } else {
      data.returned = body.returned;
    }
  } else if (!partial) {
    data.returned = false;
  }

  for (const field of TEXT_FIELDS) {
    const value = body[field.name];
    if (value === undefined) continue;
    if (typeof value !== "string") {
      errors.push(`${field.label} trebuie să fie text`);
    } else if (value.trim().length > field.max) {
      errors.push(`${field.label} poate avea cel mult ${field.max} de caractere`);
    } else {
      data[field.name] = value.trim();
    }
  }

  for (const field of NUMBER_FIELDS) {
    const value = body[field.name];
    if (value === undefined) continue;
    if (!Number.isInteger(value) || value <= 0) {
      errors.push(`${field.label} trebuie să fie un număr întreg pozitiv`);
    } else {
      data[field.name] = value;
    }
  }

  return { errors, data };
}

export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
