import { RuntimeTool } from "../types/tool";
import { buildSelect } from "../compiler/selectSingle/buildSelect";
import { executeSqlServer } from "../executor/sqlserver";

export const selectTableTool: RuntimeTool = {
  async execute(args: any) {
    const data = args[0]?.data;

    // 生成 SQL
    const result = buildSelect(data);

    // 执行数据库
    const rows = await executeSqlServer(
      result.sql,
      result.params
    );

    return {
      success: true,

      // 返回 SQL 方便调试
      sql: result.sql,

      // 返回参数
      params: result.params,

      // 数据库结果
      rows,
    };
  },
};