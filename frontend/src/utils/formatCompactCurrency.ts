import { formatCurrency } from './formatCurrency';

export function formatCompactCurrency(value: number) {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace('.', ',')} tỷ đ`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)} triệu đ`;
  }

  return formatCurrency(value);
}
