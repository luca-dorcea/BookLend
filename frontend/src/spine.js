export const CLOTHS = ["red", "blue", "yellow", "pink", "green", "turquoise", "black"];

const HEIGHTS = [88, 96, 104];

function titleSum(title) {
  let sum = 0;
  for (const letter of title) {
    sum += letter.charCodeAt(0);
  }
  return sum;
}

export function spineCloth(title) {
  return CLOTHS[titleSum(title) % CLOTHS.length];
}

export function spineHeight(title) {
  return HEIGHTS[titleSum(title) % HEIGHTS.length];
}

export function spineAuthor(author) {
  return author.trim().split(" ").pop();
}

export function spineWidth(pages) {
  if (!pages) return 16;
  return Math.min(30, Math.max(12, Math.round(pages / 22)));
}
