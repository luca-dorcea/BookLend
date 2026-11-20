export const CONDITIONS = [
  { value: "new", label: "Nouă" },
  { value: "good", label: "Bună" },
  { value: "worn", label: "Uzată" },
];

export const CONDITION_LABELS = Object.fromEntries(
  CONDITIONS.map((condition) => [condition.value, condition.label])
);

export const TYPES = ["Roman", "Nuvelă", "Povestiri", "Schițe", "Basm", "Memorii", "Jurnal", "Poveste"];
