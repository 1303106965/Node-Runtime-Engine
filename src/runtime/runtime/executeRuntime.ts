import { executeSqlServer } from "../executor/sqlserver";

interface RuntimeExecuteOptions {
  sql: string;
  params?: any[];
}

/**
 * Runtime 执行器
 *
 * 负责：
 * SQL
 * ->
 * DB
 * ->
 * rows
 */
export async function executeRuntime(
  options: RuntimeExecuteOptions
) {
  const rows = await executeSqlServer(
    options.sql,
    options.params || []
  );

  return {
    success: true,
    sql: options.sql,
    params: options.params || [],
    rows,
  };
}