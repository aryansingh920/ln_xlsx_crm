import * as ExcelJS from "exceljs";

async function changeCellBackgroundColor(
  filePath: string,
  sheetName: string,
  columnName: string,
  rowIndex: number,
  backgroundColor: string
) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    console.error(`Worksheet "${sheetName}" not found.`);
    return;
  }

  const cell = worksheet.getCell(
    rowIndex,
    worksheet.getColumn(columnName).number
  );
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: backgroundColor },
  };

  await workbook.xlsx.writeFile(filePath);
}

// Example usage:
const filePath = "example.xlsx";
const sheetName = "Sheet1";
const columnName = "A";
const rowIndex = 2; // Change to the desired row index
const backgroundColor = "FF0000"; // Background color in hexadecimal format

changeCellBackgroundColor(
  filePath,
  sheetName,
  columnName,
  rowIndex,
  backgroundColor
)
  .then(() => {
    console.log("Background color changed successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
