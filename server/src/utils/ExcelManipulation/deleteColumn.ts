import * as ExcelJS from "exceljs";
import * as fs from "fs";
import { spawn } from "child_process";
import _ from "lodash";

async function deleteColumn(
  pythonFilePath: string,
  pythonActions: string,
  inputFilePath: string,
  outputFilePath: string,
  columnName: string[]
) {

  const filePath = pythonFilePath;

  const args = [
    inputFilePath, //1
    pythonActions, //2
    outputFilePath, //3
    _.join(columnName, ","), //4
  ];

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


}

export { deleteColumn };
