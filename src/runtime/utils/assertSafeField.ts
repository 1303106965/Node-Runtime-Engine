export function assertSafeField(field: string) {
  const safePattern = /^[a-zA-Z0-9_.]+$/;

  if (!safePattern.test(field)) {
    throw new Error(`unsafe field: ${field}`);
  }
}