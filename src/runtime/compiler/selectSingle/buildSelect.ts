import { buildColumns } from "./buildColumns";
import { buildWhere } from "../buildWhere";
import { buildPagination } from "./buildPagination";
interface SelectConfig {
  mainTable: string;
  columns: any[];
  whereCondition?: any;
}

export function buildSelect(config: SelectConfig) {
  const columnsSql = buildColumns(config.columns);
  const paginationSql = buildPagination(config.paginationNode);
  let params: any[] = [];
  let sql = `
  SELECT ${columnsSql}
  FROM [${config.mainTable}]
  `;

  if (config.whereCondition) {
    const whereResult = buildWhere(config.whereCondition);

    sql += ` WHERE ${whereResult.sql}`;

    params = whereResult.params;
  }

  sql += paginationSql;

  // if (config.whereCondition) {
  //   const whereResult = buildWhere(config.whereCondition);
  //   sql += ` WHERE ${whereResult.sql}`;
  //   params = whereResult.params;
  // }

  return {
    sql: sql.trim(),
    params,
  };
}