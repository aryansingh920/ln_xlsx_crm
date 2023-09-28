import * as ExcelJS from "exceljs";
import * as fs from "fs";

async function deleteColumn(
  inputFilePath: string,
  outputFilePath: string,
  sheetName: string,
  columnIndex: number
) {
  // Load the workbook
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(inputFilePath);

  // Get the worksheet by name
  const worksheet = workbook.getWorksheet(sheetName);

  // Remove the specified column
  worksheet.columns.splice(columnIndex - 1, 1);

  // Adjust the column indices for cells in the affected columns
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber >= columnIndex) {
        // Shift the cell values to the left
        const nextCell = row.getCell(colNumber + 1);
        cell.value = nextCell.value;
      }
    });
  });

  // Save the modified workbook to a new file
  await workbook.xlsx.writeFile(outputFilePath);
}

// Example usage:
const inputFilePath = "input.xlsx"; // Replace with the path to your input Excel file
const outputFilePath = "output.xlsx"; // Replace with the path for the output Excel file
const sheetName = "Sheet1"; // Replace with the name of the sheet you want to modify
const columnIndexToDelete = 2; // Replace with the index of the column you want to delete

deleteColumn(inputFilePath, outputFilePath, sheetName, columnIndexToDelete)
  .then(() => {
    console.log(`Column ${columnIndexToDelete} deleted successfully.`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
