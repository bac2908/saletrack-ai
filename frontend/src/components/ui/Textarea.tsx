import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ className = '', error, label, ...props }: TextareaProps) {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm font-medium text-text-muted">{label}</span> : null}
      <textarea
        className={`min-h-28 w-full rounded-md border border-surface-line bg-background px-3 py-2 text-sm text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
