// import { exec } from "child_process";
import { geoPythonExecFile } from "../../constants/constants";
import { spawn } from "child_process";

async function readCountry(city: string): Promise<string | null> {
  const filePath = geoPythonExecFile; // replace with actual path

  const args = [city];

    const pythonRunner = process.env.PYTHON_RUNNER || "python" || "python3";

    const pythonProcess = spawn(pythonRunner, [filePath, ...args]);

  return new Promise<string | null>((resolve, reject) => {
    pythonProcess.stdout.on("data", (data) => {
      const country = data.toString().trim();
      resolve(country);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error in Python Script: ${data}`);
      reject(data.toString());
    });

    pythonProcess.on("close", (code: number | null) => {
      if (code === null) {
        reject(new Error("Python script exited with a null code."));
      } else {
        console.log(`Python Script Exited with Code: ${code}`);
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}`));
        }
      }
    });

    pythonProcess.on("error", (error) => {
      console.error(`Error starting Python Script: ${error.message}`);
      reject(error);
    });
  });
}

export async function getUpdatedCountryArray(
  cities: string[]
): Promise<string[]> {
  let finalCountryArray: string[] = [];
  for (let city of cities) {
    await readCountry(city)
      .then((country) => {
        console.log(`Country for ${city}: ${country}`);
        if (country) {
          console.log(`Country for ${city}: ${country}`);
          finalCountryArray.push(country);
        } else {
          finalCountryArray.push(city);
          console.log(`Failed to retrieve country for ${city}`);
        }
      })
      .catch((error) => {
        finalCountryArray.push(city);
        console.error(`Error: ${error.message}`);
      });
  }
  return finalCountryArray;
}

// // Example usage
// const city = "YourCity";
