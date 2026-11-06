export default function Lamp() {
  return (
    <svg className="lamp" viewBox="0 0 120 180" aria-hidden="true">
      <defs>
        <linearGradient id="lamp-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="lamp-cone-start" />
          <stop offset="1" className="lamp-cone-end" />
        </linearGradient>
        <radialGradient id="lamp-halo">
          <stop offset="0" className="lamp-halo-start" />
          <stop offset="1" className="lamp-halo-end" />
        </radialGradient>
      </defs>
      <line className="lamp-cord" x1="60" y1="0" x2="60" y2="46" />
      <g className="lamp-light">
        <path d="M38 72 L4 180 H116 L82 72 Z" fill="url(#lamp-cone)" />
        <circle cx="60" cy="74" r="38" fill="url(#lamp-halo)" />
        <circle className="lamp-bulb" cx="60" cy="72" r="9" />
      </g>
      <path
        className="lamp-shade"
        d="M28 74 C 30 56, 44 44, 60 44 C 76 44, 90 56, 92 74 Z"
      />
    </svg>
  );
}
