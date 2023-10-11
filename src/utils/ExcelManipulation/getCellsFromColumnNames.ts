import * as ExcelJS from "exceljs";

export async function getCellsForColumn(
  filePath: string,
  columnName: string
): Promise<string[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // Assuming the first worksheet
  const columnValues: string[] = [];

  // Find the column index with the specified name
  let columnIndex = -1;
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    if (cell.value === columnName) {
      columnIndex = colNumber;
    }
  });

  if (columnIndex === -1) {
    throw new Error(`Column with name "${columnName}" not found.`);
  }

  // Iterate through rows and collect values in the target column
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    const cell = row.getCell(columnIndex);
    columnValues.push(cell.value as string);
  });

  return columnValues;
}

// // Usage example
// async function main() {
//   const filePath = "your_excel_file.xlsx";
//   const columnNameToFind = "Company Name";

//   try {
//     const values = await getCellsForColumn(filePath, columnNameToFind);

//     for (const value of values) {
//       console.log(value);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// main();
