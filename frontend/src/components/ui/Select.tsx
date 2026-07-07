import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export default function Select({ className = '', label, options, ...props }: SelectProps) {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm font-medium text-text-muted">{label}</span> : null}
      <select
        className={`h-10 w-full rounded-md border border-surface-line bg-background px-3 text-sm text-text-strong outline-none focus:border-accent-mint ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
