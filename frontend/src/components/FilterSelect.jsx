import styles from "./FilterSelect.module.css";

export default function FilterSelect({ label, value, options, allLabel, onChange }) {
  return (
    <label className={styles.filter}>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
