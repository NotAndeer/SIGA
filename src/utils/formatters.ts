import { DEFAULT_LOCALE } from './constants';

export const formatDate = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Number.isFinite(value) ? value : 0);
};
