import { buildColumns } from "./buildColumns";
import { buildWhere } from "../buildWhere";

interface SelectConfig {
  mainTable: string;
  columns: any[];
  whereCondition?: any;
}

export function buildSelect(config: SelectConfig) {
  const columnsSql = buildColumns(config.columns);

  let sql = `
SELECT ${columnsSql}
FROM [${config.mainTable}]
`;

  let params: any[] = [];

  if (config.whereCondition) {
    const whereResult = buildWhere(config.whereCondition);

    sql += ` WHERE ${whereResult.sql}`;

    params = whereResult.params;
  }

  return {
    sql: sql.trim(),
    params,
  };
}