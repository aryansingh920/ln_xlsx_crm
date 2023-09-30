import path from "path";
import ExcelJS from "exceljs";

// Function to save the Excel file
const saveExcelFile = (newWorkbook: ExcelJS.Workbook, filePath: string) => {
  return new Promise<void>((resolve, reject) => {
    newWorkbook.xlsx
      .writeFile(filePath)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default saveExcelFile;
