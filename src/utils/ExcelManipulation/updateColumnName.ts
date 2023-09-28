import * as ExcelJS from "exceljs";
import * as fs from "fs";

async function updateColumnNames(
  inputFilePath: string,
  outputFilePath: string,
  newColumnNames: string[]
): Promise<void> {
  const workbook = new ExcelJS.Workbook();

  try {
    // Load the existing Excel file
    await workbook.xlsx.readFile(inputFilePath);

    // Assuming you want to update the first worksheet (index 1)
    const worksheet = workbook.getWorksheet(1);

    // Update the column names
    for (let i = 1; i <= newColumnNames.length; i++) {
      worksheet.getCell(1, i).value = newColumnNames[i - 1];
    }

    // Save the updated workbook to a new file
    await workbook.xlsx.writeFile(outputFilePath);

    console.log(`Column names updated and saved to ${outputFilePath}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage example
const inputFilePath = "input.xlsx"; // Replace with your input file path
const outputFilePath = "output.xlsx"; // Replace with the desired output file path
const newColumnNames = ["NewColumn1", "NewColumn2", "NewColumn3"]; // Replace with your new column names

updateColumnNames(inputFilePath, outputFilePath, newColumnNames);
