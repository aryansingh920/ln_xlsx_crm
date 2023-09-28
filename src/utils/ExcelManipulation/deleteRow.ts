import * as fs from "fs";
import * as ExcelJS from "exceljs";

async function deleteRow(
  filePath: string,
  sheetName: string,
  rowIndex: number
): Promise<void> {
  const workbook = new ExcelJS.Workbook();

  // Load the existing Excel file
  await workbook.xlsx.readFile(filePath);

  // Get the worksheet by name
  const worksheet = workbook.getWorksheet(sheetName);

  // Check if the row exists
  if (worksheet.getRow(rowIndex)) {
    // Delete the row
    worksheet.spliceRows(rowIndex, 1);
  } else {
    console.log(`Row ${rowIndex} does not exist in the worksheet.`);
  }

  // Save the modified workbook to a new file
  const outputFile = "output.xlsx";
  await workbook.xlsx.writeFile(outputFile);

  console.log(
    `Row ${rowIndex} deleted from the worksheet. Updated file saved as ${outputFile}`
  );
}

// Example usage
const excelFilePath = "example.xlsx"; // Replace with your Excel file path
const sheetNameToDeleteFrom = "Sheet1"; // Replace with the name of your worksheet
const rowToDelete = 2; // Replace with the row index you want to delete

deleteRow(excelFilePath, sheetNameToDeleteFrom, rowToDelete)
  .then(() => {
    console.log("Row deletion completed.");
  })
  .catch((err) => {
    console.error("Error deleting row:", err);
  });
