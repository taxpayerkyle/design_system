import type { ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./ListItem.module.css";

export interface ListItemProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Leading media — an Icon name (rendered in a 40px circle) or a custom node. */
  leadingIcon?: string;
  leading?: ReactNode;
  /** Trailing value text (e.g. an amount). */
  value?: ReactNode;
  /** Show a trailing chevron. Defaults to true when `onClick` is provided. */
  chevron?: boolean;
  /** Custom trailing node (overrides value/chevron). */
  trailing?: ReactNode;
  onClick?: () => void;
}

/** ListItem — row for documents, accounts, settings, navigable entries. */
export function ListItem({
  title,
  subtitle,
  leadingIcon,
  leading,
  value,
  chevron,
  trailing,
  onClick,
}: ListItemProps) {
  const showChevron = chevron ?? Boolean(onClick);
  const Element = onClick ? "button" : "div";

  return (
    <Element className={styles.item} onClick={onClick} type={onClick ? "button" : undefined}>
      {leading ?? (leadingIcon && (
        <span className={styles.leading}>
          <Icon name={leadingIcon} size={20} color="var(--color-dark-70)" />
        </span>
      ))}
      <span className={styles.text}>
        <span className={`text-body-md-strong ${styles.title}`}>{title}</span>
        {subtitle && <span className={`text-body-sm ${styles.subtitle}`}>{subtitle}</span>}
      </span>
      <span className={styles.trailing}>
        {trailing ?? (
          <>
            {value && <span className={`text-body-md ${styles.value}`}>{value}</span>}
            {showChevron && (
              <Icon name="chevron_right" size={20} color="var(--color-dark-70)" />
            )}
          </>
        )}
      </span>
    </Element>
  );
}
