import type { ReactNode } from "react";
import styles from "./Selection.module.css";

/* ---------------------------------------------------------------- Checkbox */

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
}

/** Checkbox — 20×20, yellow checked fill. */
export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <label className={[styles.checkbox, disabled ? styles.disabled : ""].filter(Boolean).join(" ")}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[styles.box, checked ? styles.checked : ""].filter(Boolean).join(" ")}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="var(--color-dark-100)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {label && <span className={`text-body-sm ${styles.controlLabel}`}>{label}</span>}
    </label>
  );
}

/* ------------------------------------------------------------------- Radio */

export interface RadioProps {
  selected: boolean;
  onSelect: () => void;
  label?: ReactNode;
  disabled?: boolean;
  name?: string;
}

/** Radio — 16×16 filled dot, for decision/option selections. */
export function Radio({ selected, onSelect, label, disabled = false, name }: RadioProps) {
  return (
    <label className={[styles.radio, disabled ? styles.disabled : ""].filter(Boolean).join(" ")}>
      <button
        type="button"
        role="radio"
        name={name}
        aria-checked={selected}
        disabled={disabled}
        onClick={onSelect}
        className={[styles.dot, selected ? styles.selected : ""].filter(Boolean).join(" ")}
      />
      {label && <span className={`text-body-sm ${styles.controlLabel}`}>{label}</span>}
    </label>
  );
}

/* ------------------------------------------------------------------ Toggle */

export interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

export interface ToggleProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Toggle — segmented control (e.g. Total / Federal / State). */
export function Toggle<T extends string>({ options, value, onChange }: ToggleProps<T>) {
  return (
    <div className={styles.toggle} role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            "text-body-sm",
            styles.segment,
            value === opt.value ? styles.active : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
