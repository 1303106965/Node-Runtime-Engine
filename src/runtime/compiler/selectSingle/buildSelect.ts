import { buildColumns } from "./buildColumns";
import { buildWhere } from "../buildWhere";
import { buildPagination } from "./buildPagination";

interface SelectConfig {
  mainTable: string;
  columns: any[];
  whereCondition?: any;
  paginationNode?: {
    pageNo: number;
    pageSize: number;
  };
}

export function buildSelect(config: SelectConfig) {
  const columnsSql = buildColumns(config.columns);

  let sql = `
  SELECT ${columnsSql}
  FROM [${config.mainTable}]
  `;

  let params: any[] = [];

  // WHERE
  if (config.whereCondition) {
    const whereResult = buildWhere(config.whereCondition);

    sql += `
    WHERE ${whereResult.sql}
    `;

    params = whereResult.params;
  }

  // PAGINATION
  const paginationSql = buildPagination(config.paginationNode);

  sql += paginationSql;

  return {
    sql: sql.trim(),
    params,
  };
}