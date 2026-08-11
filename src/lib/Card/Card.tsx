import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardSize = "compact" | "standard" | "large";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  /** Adds elevation.2. Use for a single hero/feature card per screen. */
  elevated?: boolean;
  /** Remove internal padding so full-bleed LineItem rows control their own insets. */
  flush?: boolean;
  children?: ReactNode;
}

/**
 * Card — flat surface with a 0.6px border. Radius scales with size:
 * compact 12px / standard 20px / large 20px.
 */
export function Card({
  size = "standard",
  elevated = false,
  flush = false,
  children,
  className,
  ...rest
}: CardProps) {
  const classes = [
    styles.card,
    styles[size],
    elevated ? styles.elevated : "",
    flush ? styles.flush : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export interface LineItemProps {
  label: ReactNode;
  value: ReactNode;
  /** Bold both sides (dark.100) — for the summary/total row. */
  total?: boolean;
  /** Value tone for financial figures. */
  tone?: "default" | "green" | "red";
  /** Hide the divider (use on the last row). */
  last?: boolean;
}

/**
 * LineItem — a 49px label-left / value-right row for use inside a `flush` Card.
 * Positive money → green, negative money / owed → red.
 */
export function LineItem({
  label,
  value,
  total = false,
  tone = "default",
  last = false,
}: LineItemProps) {
  const labelClass = total
    ? `text-body-md-strong ${styles.lineLabelTotal}`
    : `text-body-sm ${styles.lineLabel}`;

  const valueToneClass =
    tone === "green"
      ? styles.lineValueGreen
      : tone === "red"
        ? styles.lineValueRed
        : styles.lineValue;
  const valueClass = total
    ? `text-body-md-strong ${valueToneClass}`
    : `text-body-md ${valueToneClass}`;

  return (
    <div>
      <div className={styles.lineItem}>
        <span className={labelClass}>{label}</span>
        <span className={valueClass}>{value}</span>
      </div>
      {!last && <div className={styles.divider} />}
    </div>
  );
}
