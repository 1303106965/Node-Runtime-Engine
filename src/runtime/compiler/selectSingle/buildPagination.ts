interface PaginationConfig {
  pageNo: number;
  pageSize: number;
}

export function buildPagination(
  pagination?: PaginationConfig
): string {
  if (!pagination) {
    return "";
  }

  const pageNo = pagination.pageNo || 1;
  const pageSize = pagination.pageSize || 20;

  const offset = (pageNo - 1) * pageSize;

  return `
OFFSET ${offset} ROWS
FETCH NEXT ${pageSize} ROWS ONLY
`;
}