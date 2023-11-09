import { spawn } from "child_process";
import _ from "lodash";

async function updateColumnName(
  pythonFilePath: string,
  pythonActions: string,
  inputFilePath: string,
  outputFilePath: string,
  columnName: string,
  updateColumnName: string
) {
  const filePath = pythonFilePath;

  const args = [
    inputFilePath, //1
    pythonActions, //2
    outputFilePath, //3
    columnName, //4
    updateColumnName, //5
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
}

export { updateColumnName };
