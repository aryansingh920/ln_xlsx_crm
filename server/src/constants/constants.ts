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
    "Job",
    "Location",
    // "Linkedin",
  ],
};

const PythonActions: {
  UpdateColumnByName: string;
  DeleteColumnByName: string;
  UpdateColumnName: string;
} = {
  UpdateColumnByName: "updateColumnByName",
  DeleteColumnByName: "deleteColumn",
  UpdateColumnName: "updateColumnName",
};

// const pythonExecFile: string = path.join(__dirname, "python/main.py");
const pythonExecFile: string = path.join(__dirname, "../../python/main.py");

const FilePath: string = path.join(
  __dirname,
  `../../uploads/${Constants.FileName}`
);

const OutputFilePath: string = path.join(
  __dirname,
  `../../output/${Constants.FileName}`
);

// Export the FilePath variable

const dataSetFilePath: {
  domainTxtFile: string;
  emailNamePatternTxtFile: string;
} = {
  domainTxtFile: path.join(__dirname, "../../dataset/domain.txt"),
  emailNamePatternTxtFile: path.join(
    __dirname,
    "../../dataset/emailNamePattern.txt"
  ),
};
export {
  FilePath,
  Constants,
  OutputFilePath,
  pythonExecFile,
  PythonActions,
  dataSetFilePath,
};

