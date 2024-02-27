import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
  open?: boolean;
  className?: string;
  onClose?: () => void;
};

export function Modal({ children, className, open, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open && modal) {
      modal.showModal();
    }
    if (modal) {
      return () => modal.close();
    } else {
      return;
    }
  }, [open]);

  const portal = document.getElementById('modal');

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    portal!
  );
}
