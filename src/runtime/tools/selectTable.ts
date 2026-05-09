// import { RuntimeTool } from "../types/tool";
// import { buildWhere } from "../compiler/buildWhere";

// export const selectTableTool: RuntimeTool = {
//   async execute(args: any) {
//     const data = args[0]?.data;

//     const whereResult = buildWhere(data.whereCondition);

//     return {
//       success: true,
//       whereSql: whereResult.sql,
//       params: whereResult.params,
//     };
//   },
// };
import { RuntimeTool } from "../types/tool";
import { buildSelect } from "../compiler/selectSingle/buildSelect";

export const selectTableTool: RuntimeTool = {
  async execute(args: any) {
    const data = args[0]?.data;

    const result = buildSelect(data);

    return {
      success: true,
      sql: result.sql,
      params: result.params,
    };
  },
};