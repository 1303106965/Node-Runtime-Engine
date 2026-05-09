export interface RuntimeTool {
  execute(args: any): Promise<any>;
}