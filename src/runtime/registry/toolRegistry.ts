import { selectTableTool } from "../tools/selectTable";
import { dataInsertTool } from "../tools/dataInsert";
import { dataDeleteTool } from "../tools/dataDelete";
import { updateTableTool } from "../tools/updateTable";

export const toolRegistry = {
  selectTable: selectTableTool,
  dataInsert: dataInsertTool,
  dataDelete: dataDeleteTool,
  updateTable: updateTableTool,
};