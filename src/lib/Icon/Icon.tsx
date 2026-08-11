import type { CSSProperties } from "react";

export interface IconProps {
  /** Material Symbols Rounded glyph name, e.g. "arrow_back", "check", "chevron_right". */
  name: string;
  /** Optical + rendered size in px. 20 standard, 24 featured, 14–16 informational. */
  size?: number;
  /** Any token color, e.g. "var(--color-dark-70)". Defaults to the icon default (dark.70). */
  color?: string;
  /** 0 = outlined (default), 1 = filled (active/selected states only). */
  fill?: 0 | 1;
  style?: CSSProperties;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

/**
 * Icon — Google Material Symbols (Rounded). The ONLY icon set in Accountable.
 * Rounded variant, weight 400, grade 0. Fill 0 by default; 1 for active states.
 */
export function Icon({
  name,
  size = 20,
  color = "var(--color-dark-70)",
  fill = 0,
  style,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <span
      className={["material-symbols-rounded", className].filter(Boolean).join(" ")}
      aria-hidden={ariaLabel ? undefined : ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      style={{
        fontSize: size,
        color,
        lineHeight: 1,
        fontVariationSettings: `'FILL' ${fill}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
