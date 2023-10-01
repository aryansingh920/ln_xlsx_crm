import * as ExcelJS from "exceljs";

export async function getColumnNames(filePath: string): Promise<string[]> {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const headers: string[] = [];

    // Assuming the headers are in the first row (row 1)
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber === 1) {
        // Iterate through cells in the first row to get column names
        row.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell.value;
          if (cellValue !== null && cellValue !== undefined) {
            headers.push(cellValue.toString());
          }
        });
      }
    });

    return headers;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw error;
  }
}

// // Example usage:
// const filePath = "path/to/your/excel/file.xlsx";
// getColumnNames(filePath)
//   .then((columnNames) => {
//     console.log("Column Names:", columnNames);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
