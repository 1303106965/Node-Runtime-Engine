import { RuntimeTool } from "../types/tool";

export const dataDeleteTool: RuntimeTool = {
  async execute(args) {
    console.log("dataDelete args:", args);

    return {
      success: true,
      message: "dataDelete executed",
      args,
    };
  },
};