import * as ExcelJS from "exceljs";
import * as fs from "fs";

async function updateCell(
  workbook: ExcelJS.Workbook,
  sheetName: string,
  rowNum: number,
  colNum: number,
  text: string
): Promise<void> {
  // Get the worksheet
  const worksheet = workbook.getWorksheet(sheetName);

  // Get the cell at the specified row and column
  const cell = worksheet.getCell(rowNum, colNum);

  // Update the cell with the provided text
  cell.value = text;

  // Save the changes
  await workbook.xlsx.writeFile("UpdatedWorkbook.xlsx");
}
