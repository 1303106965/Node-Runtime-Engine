import { quoteField } from "../../utils/quoteField";

/**
 * Insert 编译结果
 */
export interface BuildInsertResult {
  sql: string;
  params: any[];
}

interface InsertConfig {
  mainTable: string;
  data: Record<string, any>;
}

/**
 * Insert 编译器
 *
 * JSON → SQL
 */
export function buildInsert(config: InsertConfig): BuildInsertResult {
  const { mainTable, data } = config;

  if (!mainTable) {
    throw new Error("mainTable is required");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("insert data cannot be empty");
  }

  const columns: string[] = [];
  const placeholders: string[] = [];
  const params: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    // 字段名安全处理（防注入）
    columns.push(quoteField(key));

    // 参数化占位符
    const paramName = `@p${params.length}`;
    placeholders.push(paramName);

    // 保存真实值（防 SQL 注入）
    params.push(value);
  });

  const sql = `
INSERT INTO ${quoteField(mainTable)}
(${columns.join(", ")})
VALUES (${placeholders.join(", ")})
`;

  return {
    sql: sql.trim(),
    params,
  };
}
