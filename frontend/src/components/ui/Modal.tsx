import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}

export default function Modal({ children, onClose, open, title }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <section className="w-full max-w-lg rounded-lg border border-surface-line bg-surface-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-line px-5 py-4">
          <h2 className="font-display text-xl font-semibold text-text-strong">{title}</h2>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-muted hover:bg-surface-card-high hover:text-text-strong"
            onClick={onClose}
            type="button"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </section>
    </div>
  );
}
