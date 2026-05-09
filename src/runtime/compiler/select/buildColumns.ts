interface ColumnConfig {
  expression: string;
  alias?: string;
}

export function buildColumns(columns: ColumnConfig[]): string {
  if (!columns || columns.length === 0) {
    return "*";
  }

  return columns
    .map((column) => {
      const expression = `[${column.expression}]`;

      if (column.alias) {
        return `${expression} AS [${column.alias}]`;
      }

      return expression;
    })
    .join(", ");
}