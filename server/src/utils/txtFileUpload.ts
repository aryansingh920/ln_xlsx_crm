import * as fs from "fs";
import * as util from "util";
import _ from "lodash";
const readFilePromise = util.promisify(fs.readFile);
const appendFilePromise = util.promisify(fs.appendFile);

export async function appendStringToFile(
  file_path: string,
  new_string: string
): Promise<string> {
  try {
    // Read the existing file content
    const existingContent = await readFilePromise(file_path, "utf8");

    // Split the file content into lines
    const lines = existingContent.split("\n");

    // Check if the new string is not already present in any line
    if (!lines.some((line) => line.trim() === _.toLower(new_string))) {
      // Append the new string to the file
      await appendFilePromise(file_path, _.toLower(new_string) + "\n");
      console.log("New string added to the file.");
      return "New string added to the file.";
    } else {
      console.log("String already exists in a line in the file.");
      return "String already exists in a line in the file.";
    }
  } catch (err) {
    console.error(`Error reading/appending to the file: ${err}`);
    return "Something went wrong.";
  }
}

// // Example usage:
// const file_path = "your_file.txt";
// const new_string = "outlook.com";

// appendStringToFile(file_path, new_string)
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
