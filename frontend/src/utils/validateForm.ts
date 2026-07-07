export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export function isRequired(value: unknown) {
  return value !== undefined && value !== null && String(value).trim().length > 0;
}
