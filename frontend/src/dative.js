const MASCULINE_IN_A = ["Mircea", "Mihnea", "Luca", "Toma", "Horea", "Costea", "Sava"];

export function toDative(name) {
  const [first, ...rest] = name.trim().split(/\s+/);
  const others = rest.length > 0 ? ` ${rest.join(" ")}` : "";

  if (!first.endsWith("a") || MASCULINE_IN_A.includes(first)) {
    return `lui ${first}${others}`;
  }
  if (first.endsWith("ca") || first.endsWith("ga")) {
    return `${first.slice(0, -1)}ăi${others}`;
  }
  if (first.endsWith("ea")) {
    return `${first.slice(0, -1)}i${others}`;
  }
  return `${first.slice(0, -1)}ei${others}`;
}
