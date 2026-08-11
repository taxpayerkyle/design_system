import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./TextInput.module.css";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  /** Helper text below the field (hidden when an error is shown). */
  helper?: string;
  /** Error message below the field; also switches the border to error red. */
  error?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

/**
 * TextInput — 50px field with label above and state-driven border
 * (empty / focused / filled / error / disabled).
 */
export function TextInput({
  label,
  helper,
  error,
  leadingIcon,
  trailingIcon,
  disabled = false,
  id,
  className,
  ...rest
}: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-error`
    : helper
      ? `${inputId}-helper`
      : undefined;

  const wrapClasses = [
    styles.field,
    error ? styles.error : "",
    disabled ? styles.disabled : "",
    leadingIcon ? styles.hasLeading : "",
    trailingIcon ? styles.hasTrailing : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapClasses}>
      {label && (
        <label className={`text-body-sm-strong ${styles.label}`} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap}>
        {leadingIcon && <span className={styles.leading}>{leadingIcon}</span>}
        <input
          id={inputId}
          className={styles.input}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {trailingIcon && <span className={styles.trailing}>{trailingIcon}</span>}
      </div>
      {error ? (
        <span id={`${inputId}-error`} className={`text-body-xs ${styles.errorText}`}>
          {error}
        </span>
      ) : helper ? (
        <span id={`${inputId}-helper`} className={`text-body-xs ${styles.helper}`}>
          {helper}
        </span>
      ) : null}
    </div>
  );
}
