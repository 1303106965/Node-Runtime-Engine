import { RuntimeTool } from "../types/tool";

export const updateTableTool: RuntimeTool = {
  async execute(args) {
    console.log("updateTable args:", args);

    return {
      success: true,
      message: "updateTable executed",
      args,
    };
  },
};