import * as ExcelJS from "exceljs";
import * as fs from "fs";

// Define the path to your Excel file
const filePath = "path/to/your/excel/file.xlsx";

// Define the text you want to search for and replace
const searchText = "OldText"; // Replace with the text you want to search for
const replacementText = "NewText"; // Replace with the text you want to replace with

async function updateExcelCells() {
  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Load the existing Excel file
    await workbook.xlsx.readFile(filePath);

    // Select the worksheet you want to update (by index or name)
    const worksheet = workbook.getWorksheet(1); // Change 1 to the index of your worksheet or use the worksheet name

    // Loop through all rows in the worksheet
    worksheet.eachRow((row, rowNumber) => {
      // Loop through all cells in the row
      row.eachCell((cell, colNumber) => {
        // Check if the cell's value matches the search text
        if (cell.value === searchText) {
          // Update the cell's value with the replacement text
          cell.value = replacementText;
        }
      });
    });

    // Save the updated workbook
    await workbook.xlsx.writeFile(filePath);

    console.log("Cells updated successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the updateExcelCells function to update the cells
updateExcelCells();
