import { RuntimeTool } from "../types/tool";
import { buildInsert } from "../compiler/insert/buildInsert";
import { executeRuntime } from "../runtime/executeRuntime";

export const dataInsertTool: RuntimeTool = {
  async execute(args: any) {
    const data = args[0]?.data;

    // 编译 SQL
    const result = buildInsert(data);

    // 执行
    return executeRuntime({
      sql: result.sql,
      params: result.params,
    });
  },
};
