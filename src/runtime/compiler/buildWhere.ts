import { quoteField } from "../utils/quoteField";

/**
 * buildWhere 返回结果
 */
export interface BuildWhereResult {
  sql: string;
  params: any[];
}

/**
 * where 条件节点
 *
 * 当前支持：
 * AND
 * OR
 * EQ
 * NE
 * LIKE
 * IN
 */
interface WhereNode {
  type: string;

  // 字段名
  key?: string;

  // 条件值
  value?: any;

  // 子条件
  children?: WhereNode[];
}

/**
 * where 条件编译器
 *
 * 作用：
 * JSON DSL
 * ->
 * SQL WHERE
 *
 * 例如：
 *
 * {
 *   type: "AND",
 *   children: [
 *     {
 *       key: "age",
 *       type: "EQ",
 *       value: 18
 *     }
 *   ]
 * }
 *
 * ->
 *
 * ([age] = @p0)
 *
 */
export function buildWhere(
  node: WhereNode,
  params: any[] = []
): BuildWhereResult {
  /**
   * AND / OR
   *
   * 递归处理条件树
   */
  if (node.type === "AND" || node.type === "OR") {
    const childSqlList: string[] = [];

    for (const child of node.children || []) {
      const result = buildWhere(child, params);

      childSqlList.push(result.sql);
    }

    return {
      sql: `(${childSqlList.join(` ${node.type} `)})`,
      params,
    };
  }

  /**
   * EQ
   *
   * 使用参数化查询防止 SQL 注入
   *
   * 不直接拼接 value：
   * ❌ age = 18
   *
   * 而是：
   * ✅ age = @p0
   *
   * 最终通过：
   * request.input("p0", value)
   *
   * 绑定真实参数
   */
  if (node.type === "EQ") {
    const paramName = `@p${params.length}`;

    // 保存真实参数
    params.push(node.value);

    return {
      // 字段名需要安全处理
      sql: `${quoteField(node.key!)} = ${paramName}`,
      params,
    };
  }

  /**
   * NE
   */
  if (node.type === "NE") {
    const paramName = `@p${params.length}`;

    params.push(node.value);

    return {
      sql: `${quoteField(node.key!)} != ${paramName}`,
      params,
    };
  }

  /**
   * LIKE
   *
   * LIKE 同样必须参数化
   * 防止：
   *
   * %' OR 1=1 --
   */
  if (node.type === "LIKE") {
    const paramName = `@p${params.length}`;

    params.push(`%${node.value}%`);

    return {
      sql: `${quoteField(node.key!)} LIKE ${paramName}`,
      params,
    };
  }

  /**
   * IN
   *
   * IN 查询中的每个值
   * 都必须生成独立参数
   *
   * 不能：
   * ❌ IN (${array.join(",")})
   *
   * 必须：
   * ✅ IN (@p0, @p1, @p2)
   */
  if (node.type === "IN") {
    const placeholders: string[] = [];

    for (const value of node.value || []) {
      const paramName = `@p${params.length}`;

      params.push(value);

      placeholders.push(paramName);
    }

    return {
      sql: `${quoteField(node.key!)} IN (${placeholders.join(", ")})`,
      params,
    };
  }

  /**
   * 不支持的 where 类型
   */
  throw new Error(`unsupported where type: ${node.type}`);
}