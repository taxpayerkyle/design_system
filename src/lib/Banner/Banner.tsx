import type { ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Banner.module.css";

export type BannerTone = "neutral" | "success" | "error" | "warning";

export interface BannerProps {
  tone?: BannerTone;
  title?: ReactNode;
  children?: ReactNode;
  /** Override the default per-tone icon. */
  icon?: string;
  onDismiss?: () => void;
}

const toneIcon: Record<BannerTone, string> = {
  neutral: "info",
  success: "check_circle",
  error: "error",
  warning: "warning",
};

const toneColor: Record<BannerTone, string> = {
  neutral: "var(--color-dark-70)",
  success: "var(--color-green)",
  error: "var(--color-error)",
  warning: "var(--color-amber)",
};

/** Banner / Alert — inline status message with a semantic tint. */
export function Banner({
  tone = "neutral",
  title,
  children,
  icon,
  onDismiss,
}: BannerProps) {
  return (
    <div className={`${styles.banner} ${styles[tone]}`} role="status">
      <span className={styles.icon}>
        <Icon name={icon ?? toneIcon[tone]} size={18} color={toneColor[tone]} />
      </span>
      <div className={styles.content}>
        {title && <span className={`text-body-sm-strong ${styles.title}`}>{title}</span>}
        {children && <span className={`text-body-sm ${styles.body}`}>{children}</span>}
      </div>
      {onDismiss && (
        <button className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          <Icon name="close" size={18} color="var(--color-dark-70)" />
        </button>
      )}
    </div>
  );
}
