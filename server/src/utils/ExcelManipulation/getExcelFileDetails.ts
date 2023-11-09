import * as ExcelJS from "exceljs";
import * as fs from "fs";

interface ExcelFileDetails {
  columnNames: string[];
  rowCount: number;
  sheetNames: string[];
  creator: string;
  lastModifiedBy: string;
  createdDate: Date | null;
  modifiedDate: Date | null;
}

export async function getExcelFileDetails(
  filePath: string
): Promise<ExcelFileDetails> {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheetNames = workbook.worksheets.map((worksheet) => worksheet.name);

    const worksheet = workbook.worksheets[0]; // Get the first worksheet

    const columnNames: string[] = [];
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell) => {
          const columnName = cell.value as string;
          columnNames.push(columnName);
        });
      }
    });

    const rowCount = worksheet.rowCount;
    const creator = workbook.creator;
    const lastModifiedBy = workbook.lastModifiedBy;
    const createdDate = workbook.created;
    const modifiedDate = workbook.modified;

    return {
      columnNames,
      rowCount,
      sheetNames,
      creator,
      lastModifiedBy,
      createdDate,
      modifiedDate,
    };
  } catch (error) {
    throw error;
  }
}

// Example usage:
// const excelFilePath = "path/to/your/excel/file.xlsx";
// getExcelFileDetails(excelFilePath)
//   .then((fileDetails) => {
//     console.log("File Details:", fileDetails);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
