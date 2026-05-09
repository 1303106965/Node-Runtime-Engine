import { assertSafeField } from "./assertSafeField";

export function quoteField(field: string): string {
  assertSafeField(field);

  const parts = field.split(".");

  return parts.map((part) => `[${part}]`).join(".");
}