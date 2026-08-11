import { useEffect } from "react";
import type { ReactNode } from "react";
import styles from "./Overlay.module.css";

function useEscape(onClose?: () => void) {
  useEffect(() => {
    if (!onClose) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
}

/* ------------------------------------------------------------------- Modal */

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
}

/** Modal — centered dialog with scrim. Backdrop tap / Escape closes. */
export function Modal({ open, onClose, title, children }: ModalProps) {
  useEscape(open ? onClose : undefined);
  if (!open) return null;

  return (
    <div
      className={`${styles.scrim} ${styles.scrimCenter}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className={`text-heading-md ${styles.title}`}>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- BottomSheet */

export interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
}

/** BottomSheet — content-height sheet that slides up. Handle, scrim, tap-to-dismiss. */
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  useEscape(open ? onClose : undefined);
  if (!open) return null;

  return (
    <div
      className={`${styles.scrim} ${styles.scrimBottom}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handleWrap}>
          <div className={styles.handle} />
        </div>
        {title && <h2 className={`text-heading-md ${styles.title}`}>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
