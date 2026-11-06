const BAYS = [10, 130, 250];
const BASES = [92, 192];
const BAY_WIDTH = 110;

const COMPARTMENTS = [
  {
    bay: 0,
    row: 0,
    items: [
      { type: "book", x: 4, w: 9, h: 70, tone: "a", band: true },
      { type: "book", x: 13, w: 11, h: 74, tone: "c", band: true },
      { type: "book", x: 24, w: 8, h: 66, tone: "b" },
      { type: "book", x: 32, w: 10, h: 72, tone: "e", band: true },
      { type: "book", x: 42, w: 9, h: 68, tone: "a" },
      { type: "book", x: 51, w: 12, h: 76, tone: "c", band: true },
      { type: "book", x: 63, w: 8, h: 70, tone: "d" },
      { type: "stack", x: 76, w: 30, n: 3 },
      { type: "clock", x: 91, y: 62, r: 9 },
    ],
  },
  {
    bay: 0,
    row: 1,
    items: [
      { type: "frame", x: 6, w: 30, h: 40 },
      { type: "book", x: 40, w: 10, h: 72, tone: "h", band: true },
      { type: "book", x: 50, w: 9, h: 66, tone: "b" },
      { type: "book", x: 59, w: 11, h: 74, tone: "f", band: true },
      { type: "book", x: 70, w: 8, h: 62, tone: "d" },
      { type: "book", x: 78, w: 10, h: 70, tone: "a", band: true },
      { type: "book", x: 88, w: 9, h: 68, tone: "g" },
      { type: "book", x: 97, w: 10, h: 74, tone: "c", band: true },
    ],
  },
  {
    bay: 1,
    row: 0,
    items: [
      { type: "book", x: 4, w: 10, h: 72, tone: "d" },
      { type: "book", x: 14, w: 9, h: 68, tone: "d" },
      { type: "book", x: 23, w: 11, h: 74, tone: "b", band: true },
      { type: "book", x: 34, w: 8, h: 64, tone: "d" },
      { type: "book", x: 42, w: 10, h: 70, tone: "b", band: true },
      { type: "book", x: 52, w: 9, h: 70, tone: "a", band: true, lean: 14 },
      { type: "plant", x: 84 },
    ],
  },
  {
    bay: 1,
    row: 1,
    items: [
      { type: "stack", x: 4, w: 34, n: 4 },
      { type: "book", x: 42, w: 9, h: 70, tone: "a", band: true },
      { type: "book", x: 51, w: 11, h: 74, tone: "e", band: true },
      { type: "book", x: 62, w: 8, h: 66, tone: "c" },
      { type: "book", x: 70, w: 10, h: 72, tone: "a", band: true },
      { type: "book", x: 80, w: 9, h: 68, tone: "b" },
      { type: "book", x: 89, w: 12, h: 76, tone: "c", band: true },
      { type: "book", x: 101, w: 7, h: 64, tone: "d" },
    ],
  },
  {
    bay: 2,
    row: 0,
    items: [
      { type: "book", x: 4, w: 9, h: 74, tone: "h", band: true },
      { type: "book", x: 13, w: 10, h: 70, tone: "g" },
      { type: "book", x: 23, w: 8, h: 66, tone: "h", band: true },
      { type: "book", x: 31, w: 11, h: 72, tone: "f" },
      { type: "book", x: 42, w: 9, h: 68, tone: "h", band: true },
      { type: "frame", x: 58, w: 26, h: 32 },
      { type: "vase", x: 92 },
    ],
  },
  {
    bay: 2,
    row: 1,
    items: [
      { type: "book", x: 4, w: 10, h: 72, tone: "b", band: true },
      { type: "book", x: 14, w: 9, h: 68, tone: "a" },
      { type: "book", x: 23, w: 11, h: 74, tone: "c", band: true },
      { type: "book", x: 34, w: 8, h: 64, tone: "b" },
      { type: "book", x: 42, w: 10, h: 70, tone: "a", band: true },
      { type: "book", x: 52, w: 9, h: 66, tone: "e" },
      { type: "book", x: 61, w: 12, h: 76, tone: "c", band: true },
      { type: "book", x: 73, w: 8, h: 70, tone: "b" },
      { type: "stack", x: 86, w: 22, n: 2 },
    ],
  },
];

const STACK_TONES = ["c", "b", "e", "a"];

function Book({ x, y, w, h, tone, band }) {
  return (
    <>
      <rect className={`spine spine-${tone}`} x={x} y={y} width={w} height={h} rx="1" />
      <rect x={x} y={y} width={w} height={h} fill="url(#spine-shade)" />
      {band && (
        <>
          <rect className="spine-band" x={x + 1} y={y + 7} width={w - 2} height="1.5" />
          <rect className="spine-band" x={x + 1} y={y + 11} width={w - 2} height="1.5" />
          <rect className="spine-band" x={x + 1} y={y + h - 10} width={w - 2} height="1.5" />
        </>
      )}
    </>
  );
}

function Item({ item, left, base }) {
  const x = left + item.x;

  if (item.type === "book") {
    const book = <Book x={x} y={base - item.h} w={item.w} h={item.h} tone={item.tone} band={item.band} />;
    return item.lean ? <g transform={`rotate(${item.lean} ${x} ${base})`}>{book}</g> : book;
  }

  if (item.type === "stack") {
    return Array.from({ length: item.n }, (_, i) => (
      <Book
        key={i}
        x={x + (i % 2) * 2}
        y={base - (i + 1) * 7}
        w={item.w - (i % 2) * 4}
        h={6}
        tone={STACK_TONES[i % STACK_TONES.length]}
      />
    ));
  }

  if (item.type === "clock") {
    const cy = item.y;
    return (
      <>
        <circle className="decor-dark" cx={x} cy={cy} r={item.r} />
        <circle className="decor-light" cx={x} cy={cy} r={item.r - 2} />
        <path className="clock-hands" d={`M${x} ${cy - 5} V${cy} H${x + 4}`} />
      </>
    );
  }

  if (item.type === "frame") {
    return (
      <g transform={`rotate(-5 ${x} ${base})`}>
        <rect className="decor-dark" x={x} y={base - item.h} width={item.w} height={item.h} />
        <rect className="decor-art" x={x + 3} y={base - item.h + 3} width={item.w - 6} height={item.h - 6} />
      </g>
    );
  }

  if (item.type === "plant") {
    return (
      <>
        <ellipse className="decor-leaf" cx={x + 8} cy={base - 26} rx="7" ry="12" />
        <ellipse className="decor-leaf" cx={x + 2} cy={base - 20} rx="5" ry="9" transform={`rotate(-35 ${x + 2} ${base - 20})`} />
        <ellipse className="decor-leaf" cx={x + 14} cy={base - 20} rx="5" ry="9" transform={`rotate(35 ${x + 14} ${base - 20})`} />
        <rect className="decor-pot" x={x} y={base - 14} width="16" height="14" rx="2" />
      </>
    );
  }

  return <rect className="decor-pot" x={x} y={base - 20} width="12" height="20" rx="5" />;
}

export default function Bookcase() {
  return (
    <svg className="bookcase" aria-hidden="true">
      <defs>
        <linearGradient id="spine-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="shelf-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="shelf-glow-start" />
          <stop offset="1" className="shelf-glow-end" />
        </linearGradient>
        <pattern id="shelves" width="360" height="200" patternUnits="userSpaceOnUse">
          <rect className="case-back" width="360" height="200" />
          {COMPARTMENTS.map(({ bay, row, items }) => {
            const left = BAYS[bay];
            const base = BASES[row];
            return (
              <g key={`${bay}-${row}`}>
                {items.map((item, i) => (
                  <Item key={i} item={item} left={left} base={base} />
                ))}
                <rect x={left} y={base - 92} width={BAY_WIDTH} height="48" fill="url(#shelf-glow)" />
                <rect className="shelf-light" x={left + 48} y={base - 91} width="14" height="2" rx="1" />
              </g>
            );
          })}
          {BASES.map((base) => (
            <g key={base}>
              <rect className="shelf-plank" y={base} width="360" height="8" />
              <rect className="shelf-edge" y={base} width="360" height="1" />
            </g>
          ))}
          {[0, 120, 240].map((x) => (
            <rect key={x} className="shelf-plank" x={x} width="10" height="200" />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#shelves)" />
    </svg>
  );
}
