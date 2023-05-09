export function normalizeFields(
  maybeFields: string[],
  allowedFields: string[]
): string[] {
  return maybeFields.filter((maybeField) => allowedFields.includes(maybeField));
}

export function normalizeData(
  maybeData: {[key: string]: any},
  allowedFields: string[]
): {
  [key: string]: any;
} {
  const entries = Object.entries(maybeData).filter(([maybeField, _]) =>
    allowedFields.includes(maybeField)
  );
  return Object.fromEntries(entries);
}
