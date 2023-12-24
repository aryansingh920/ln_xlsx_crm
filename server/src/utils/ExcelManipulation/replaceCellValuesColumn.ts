import { Workbook } from "exceljs";

async function replaceColumnValues(
  filePath: string,
  sheetName: string,
  columnName: string,
  newValues: string[]
): Promise<void> {
  const workbook = new Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  const columnNumber = worksheet.getColumn(columnName).number;

  for (let i = 0; i < newValues.length; i++) {
    const row = worksheet.getRow(i + 2); // assuming the first row is a header
    const cell = row.getCell(columnNumber);
    cell.value = newValues[i];
  }

  await workbook.xlsx.writeFile(filePath);
}
