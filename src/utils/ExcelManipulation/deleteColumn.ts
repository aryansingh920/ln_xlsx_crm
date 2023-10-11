import * as ExcelJS from "exceljs";
import * as fs from "fs";
import { spawn } from "child_process";
import _ from "lodash";

async function deleteColumn(
  inputFilePath: string,
  outputFilePath: string,
  sheetName: string,
  columnName: string[]
) {
  // console.log(inputFilePath, outputFilePath, sheetName, columnName);
  const filePath = "python/main.py";
  // console.log current directory
  // console.log("Remove column names ", columnName);
  // console.log("Current directory:", process.cwd());

  const args = [
    inputFilePath,
    "deleteColumn",
    _.join(columnName, ","),
    outputFilePath,
  ]; // Replace with actual values

  // console.log("Args", args);
  const pythonProcess = spawn("python", [filePath, ...args]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python Script Output: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error in Python Script: ${data}`);
  });

  const code = await new Promise<number>((resolve, reject) => {
    pythonProcess.on("close", (code: number | null) => {
      if (code === null) {
        reject(new Error("Python script exited with a null code."));
      } else {
        console.log(`Python Script Exited with Code: ${code}`);
        resolve(code);
      }
    });

    pythonProcess.on("error", (error) => {
      console.error(`Error starting Python Script: ${error.message}`);
      reject(error);
    });
  });

  // if (code === 0) {
  //   // Load the workbook
  //   const workbook = new ExcelJS.Workbook();
  //   await workbook.xlsx.readFile(inputFilePath);

  //   // Get the worksheet by name and assert that it's not null or undefined
  //   const worksheet = workbook.getWorksheet(sheetName);

  //   if (!worksheet) {
  //     throw new Error(`Sheet "${sheetName}" not found in the workbook.`);
  //   }

  //   // Find the column by name
  //   let columnIndex = -1;

  //   worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
  //     if (cell.value === columnName) {
  //       columnIndex = colNumber;
  //     }
  //   });

  //   console.log("Column Index", columnIndex);

  //   if (columnIndex >= 1) {
  //     // Remove the specified column
  //     worksheet.columns.splice(columnIndex - 1, 1);

  //     // Save the modified workbook to a new file
  //     await workbook.xlsx.writeFile(outputFilePath);
  //     console.log(`Column "${columnName}" deleted successfully.`);
  //   } else {
  //     throw new Error(
  //       `Column "${columnName}" not found in sheet "${sheetName}".`
  //     );
  //   }
  // } else {
  //   console.error("Python script exited with a non-zero code.");
  // }
}

export { deleteColumn };
