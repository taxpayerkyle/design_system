import type { ReactNode } from "react";
import styles from "./Pill.module.css";

export type PillTone = "neutral" | "success" | "error" | "warning";

export interface PillProps {
  tone?: PillTone;
  /** Show a leading status dot. */
  dot?: boolean;
  children: ReactNode;
}

/** Pill — status capsule (e.g. "Refund due"). bodyXs label. */
export function Pill({ tone = "neutral", dot = false, children }: PillProps) {
  return (
    <span className={`text-body-xs ${styles.pill} ${styles[tone]}`}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
