// Export a constant with default values
import path from "path";

const Constants: {
  FileName: string;
  SheetName: string;
  Columns_To_Keep: string[];
} = {
  FileName: "output.xlsx",
  SheetName: "Sheet 1",
  Columns_To_Keep: [
    "Name",
    "First Name",
    "Last Name",
    "Emails",
    "Phones",
    "Company",
    "Title",
    "Country",
    "Source",
    "Industry",
    "Assigned User",
  ],
};

// Create the file path
const FilePath: string = path.join(
  __dirname,
  `../../uploads/${Constants.FileName}`
);

// Export the FilePath variable
export { FilePath, Constants };

