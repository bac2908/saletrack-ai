/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#031427',
        surface: '#06182b',
        'surface-low': '#0b1c30',
        'surface-card': '#102034',
        'surface-card-high': '#1b2b3f',
        'surface-line': '#26364a',
        'text-strong': '#d3e4fe',
        'text-muted': '#9ca8ba',
        'accent-mint': '#4edea3',
        'accent-mint-soft': '#00a572',
        'accent-amber': '#ffb95f',
        'accent-ice': '#bec6e0',
        'danger-soft': '#ffb4ab',
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
