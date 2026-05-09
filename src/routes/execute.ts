import { Router } from "express";
import { toolRegistry } from "../runtime/registry/toolRegistry";

const router = Router();

router.post("/", async (req, res) => {
  
  try {
    const { function: functionName, args } = req.body as {
      function: keyof typeof toolRegistry;
      args: any;
    };
    
    const tool = toolRegistry[functionName];
    console.log('✨入参：',functionName,tool);

    if (!tool) {
      return res.status(400).json({
        success: false,
        message: `tool not found: ${functionName}`,
      });
    }

    const result = await tool.execute(args);

    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;