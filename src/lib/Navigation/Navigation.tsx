import type { ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Navigation.module.css";

/* --------------------------------------------------------------- IOSHeader */

/** IOSHeader — 43px iOS status bar (time + signal/wifi/battery). */
export function IOSHeader({ time = "9:41" }: { time?: string }) {
  return (
    <div className={styles.iosHeader}>
      <span className={`text-body-sm ${styles.iosTime}`}>{time}</span>
      <span className={styles.iosGlyphs}>
        <Icon name="signal_cellular_4_bar" size={16} color="var(--color-dark-100)" />
        <Icon name="wifi" size={16} color="var(--color-dark-100)" />
        <Icon name="battery_full" size={16} color="var(--color-dark-100)" />
      </span>
    </div>
  );
}

/* --------------------------------------------------------------- AppHeader */

export interface AppHeaderProps {
  title?: ReactNode;
  /** Leading nav action, e.g. { icon: "arrow_back", onClick }. */
  leading?: { icon: string; onClick?: () => void; label?: string };
  trailing?: { icon: string; onClick?: () => void; label?: string };
}

/** AppHeader — 100px, centered title/logo with optional nav icons. */
export function AppHeader({ title, leading, trailing }: AppHeaderProps) {
  return (
    <header className={styles.appHeader}>
      {leading && (
        <button
          className={`${styles.navIcon} ${styles.navLeading}`}
          onClick={leading.onClick}
          aria-label={leading.label ?? "Back"}
        >
          <Icon name={leading.icon} size={20} color="var(--color-dark-70)" />
        </button>
      )}
      {title && <span className={`text-heading-lg ${styles.appHeaderTitle}`}>{title}</span>}
      {trailing && (
        <button
          className={`${styles.navIcon} ${styles.navTrailing}`}
          onClick={trailing.onClick}
          aria-label={trailing.label ?? "Action"}
        >
          <Icon name={trailing.icon} size={20} color="var(--color-dark-70)" />
        </button>
      )}
    </header>
  );
}

/* ------------------------------------------------------------ SectionLabel */

/** SectionLabel — bodySmStrong in dark.90, 8px above its card. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className={`text-body-sm-strong ${styles.sectionLabel}`}>{children}</div>;
}

/* ------------------------------------------------------------ LockedFooter */

export interface LockedFooterProps {
  children: ReactNode;
  disclaimer?: ReactNode;
}

/** LockedFooter — pinned bottom bar. Compact = one CTA; add disclaimer to expand. */
export function LockedFooter({ children, disclaimer }: LockedFooterProps) {
  return (
    <div className={styles.footer}>
      {children}
      {disclaimer && <p className={`text-body-xs ${styles.disclaimer}`}>{disclaimer}</p>}
    </div>
  );
}
