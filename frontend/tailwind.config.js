/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-low': 'rgb(var(--color-surface-low) / <alpha-value>)',
        'surface-card': 'rgb(var(--color-surface-card) / <alpha-value>)',
        'surface-card-high': 'rgb(var(--color-surface-card-high) / <alpha-value>)',
        'surface-line': 'rgb(var(--color-surface-line) / <alpha-value>)',
        'text-strong': 'rgb(var(--color-text-strong) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'accent-mint': 'rgb(var(--color-accent-mint) / <alpha-value>)',
        'accent-mint-soft': 'rgb(var(--color-accent-mint-soft) / <alpha-value>)',
        'accent-amber': 'rgb(var(--color-accent-amber) / <alpha-value>)',
        'accent-ice': 'rgb(var(--color-accent-ice) / <alpha-value>)',
        'danger-soft': 'rgb(var(--color-danger-soft) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Hanken Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(78, 222, 163, 0.18)',
        panel: '0 24px 80px rgba(0, 15, 33, 0.45)',
      },
    },
  },
  plugins: [],
};
