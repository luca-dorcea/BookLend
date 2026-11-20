import styles from "./Lamp.module.css";

export default function Lamp({ theme }) {
  const light = theme === "dark" ? styles.cold : styles.warm;

  return (
    <>
      <svg className={styles.lamp} viewBox="0 0 120 180" aria-hidden="true">
        <defs>
          <radialGradient id="lamp-halo">
            <stop offset="0" className={styles.haloStart} />
            <stop offset="1" className={styles.haloEnd} />
          </radialGradient>
        </defs>
        <line className={styles.cord} x1="60" y1="0" x2="60" y2="46" />
        <g className={light}>
          <circle cx="60" cy="74" r="38" fill="url(#lamp-halo)" />
          <circle className={styles.bulb} cx="60" cy="72" r="9" />
        </g>
        <path
          className={styles.shade}
          d="M28 74 C 30 56, 44 44, 60 44 C 76 44, 90 56, 92 74 Z"
        />
      </svg>
      <div className={`${styles.pool} ${light}`} aria-hidden="true" />
    </>
  );
}
