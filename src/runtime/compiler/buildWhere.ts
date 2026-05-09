export interface BuildWhereResult {
  sql: string;
  params: any[];
}

interface WhereNode {
  type: string;
  key?: string;
  value?: any;
  children?: WhereNode[];
}

export function buildWhere(
  node: WhereNode,
  params: any[] = []
): BuildWhereResult {
  // AND / OR
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

  // EQUAL
  if (node.type === "EQUAL") {
    const paramName = `@p${params.length}`;

    params.push(node.value);

    return {
      sql: `[${node.key}] = ${paramName}`,
      params,
    };
  }

  // LIKE
  if (node.type === "LIKE") {
    const paramName = `@p${params.length}`;

    params.push(`%${node.value}%`);

    return {
      sql: `[${node.key}] LIKE ${paramName}`,
      params,
    };
  }

  // IN
  if (node.type === "IN") {
    const placeholders: string[] = [];

    for (const value of node.value || []) {
      const paramName = `@p${params.length}`;

      params.push(value);

      placeholders.push(paramName);
    }

    return {
      sql: `[${node.key}] IN (${placeholders.join(", ")})`,
      params,
    };
  }

  throw new Error(`unsupported where type: ${node.type}`);
}