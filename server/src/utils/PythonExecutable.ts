// import { spawn } from "child_process";

// export { spawn };
// export function getPythonExecutable(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const possiblePythonExecutables: string[] = ["python3", "python"];

//     const checkExecutable = (executable: string) => {
//       const pythonProcess = spawn(executable, ["--version"]);

//       pythonProcess.stdout.on("data", (data) => {
//         const pythonPath: string = data.toString().trim();

//         if (pythonPath.length > 0) {
//           console.log(`Using ${executable} at ${pythonPath}`);
//           resolve(executable);
//         }
//       });

//       pythonProcess.on("error", (error) => {
//         // Ignore errors and try the next executable
//       });

//       pythonProcess.on("close", () => {
//         // If no suitable Python executable is found, reject the promise
//         reject(new Error("No suitable Python executable found."));
//       });
//     };

//     // Try each possible executable
//     for (const executable of possiblePythonExecutables) {
//       checkExecutable(executable);
//     }
//   });
// }
