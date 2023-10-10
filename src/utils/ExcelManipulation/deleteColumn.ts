import * as ExcelJS from "exceljs";
import * as fs from "fs";
import { spawn } from "child_process";


async function deleteColumn(
  inputFilePath: string,
  outputFilePath: string,
  sheetName: string,
  columnName: string
) {
  console.log(inputFilePath, outputFilePath, sheetName, columnName);
  const filePath = "python/main.py";
  //console current directory
  console.log("Current directory:", process.cwd());
  // const outputFilePath = "output.xlsx";
  const args = [inputFilePath,"deleteColumn", columnName, outputFilePath]; // Replace with actual values

  console.log("Args", args);
  const pythonProcess = spawn("python", [filePath, ...args]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python Script Output: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error in Python Script: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python Script Exited with Code: ${code}`);
  });

  // // Load the workbook
  // const workbook = new ExcelJS.Workbook();
  // await workbook.xlsx.readFile(inputFilePath);

  // // Get the worksheet by name and assert that it's not null or undefined
  // const worksheet = workbook.getWorksheet(sheetName);

  // if (!worksheet) {
  //   throw new Error(`Sheet "${sheetName}" not found in the workbook.`);
  // }

  // // Find the column by name
  // let columnIndex = -1;

  // worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
  //   if (cell.value === columnName) {
  //     columnIndex = colNumber;
  //   }
  // });

  // console.log("Column Index", columnIndex);

  // if (columnIndex >= 1) {
  //   // Remove the specified column
  //   worksheet.columns.splice(columnIndex - 1, 1);

  //   // Save the modified workbook to a new file
  //   await workbook.xlsx.writeFile(outputFilePath);
  //   console.log(`Column "${columnName}" deleted successfully.`);
  // } else {
  //   throw new Error(
  //     `Column "${columnName}" not found in sheet "${sheetName}".`
  //   );
  // }
}

export { deleteColumn };

// Example usage:
// const inputFilePath = "input.xlsx"; // Replace with the path to your input Excel file
// const outputFilePath = "output.xlsx"; // Replace with the path for the output Excel file
// const sheetName = "Sheet1"; // Replace with the name of the sheet you want to modify
// const columnNameToDelete = "ColumnName"; // Replace with the name of the column you want to delete

// deleteColumn(inputFilePath, outputFilePath, sheetName, columnNameToDelete);
