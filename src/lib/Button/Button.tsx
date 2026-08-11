import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "negative";
export type ButtonSize = "lg" | "md" | "sm" | "xs";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Glass bevel effect. On by default for lg/md/sm; ignored on xs and when disabled. */
  shadow?: boolean;
  /** Show spinner, keep dimensions, block interaction. */
  loading?: boolean;
  /** Stretch to fill container (intended for lg/md in CTAs and forms). */
  fluid?: boolean;
  children?: ReactNode;
}

/**
 * Button — primary / secondary / negative, in lg / md / sm / xs.
 * Pill-shaped. Glass bevel via `shadow` (Button Dark for primary, Button Light
 * for secondary). Disabled is a single treatment regardless of variant.
 */
export function Button({
  variant = "primary",
  size = "lg",
  shadow = true,
  loading = false,
  fluid = false,
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  // Glass: primary → dark bevel, secondary → light bevel. Negative & xs never glass.
  const glassClass =
    shadow && !isDisabled && size !== "xs"
      ? variant === "primary"
        ? styles.shadowDark
        : variant === "secondary"
          ? styles.shadowLight
          : ""
      : "";

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fluid ? styles.fluid : "",
    glassClass,
    isDisabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : children}
    </button>
  );
}
