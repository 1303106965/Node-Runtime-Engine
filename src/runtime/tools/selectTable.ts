import { RuntimeTool } from "../types/tool";

export const selectTableTool: RuntimeTool = {
  async execute(args:any) {
    console.log("selectTable args:", args);

    return {
      success: true,
      message: "selectTable executed",
      args,
    };
  },
};