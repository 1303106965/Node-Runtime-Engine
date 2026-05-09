import { RuntimeTool } from "../types/tool";

export const dataInsertTool: RuntimeTool = {
  async execute(args) {
    console.log("dataInsert args:", args);

    return {
      success: true,
      message: "dataInsert executed",
      args,
    };
  },
};