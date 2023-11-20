// Export a constant with default values
import path from "path";

const Constants: {
  FileName: string;
  SheetName: string;
  Columns_To_Keep: string[];
  InvalidEmailMessage: string;
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
  InvalidEmailMessage: "Email Invalid",
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

const pythonExecFile: string = path.join(__dirname, "../../python/main.py");
const geoPythonExecFile: string = path.join(__dirname, "../../python/geo.py");

const FilePath: string = path.join(
  __dirname,
  `../../uploads/${Constants.FileName}`
);

const OutputFilePath: string = path.join(
  __dirname,
  `../../output/${Constants.FileName}`
);

const updateExcelColumnNames: Record<string, string> = {
  "First Name": "First Name",
  "Last Name": "Last Name",
  Emails: "Emails",
  Phones: "Phones",
  Company: "Company",
  Title: "Title",
  Country: "Country",
  Source: "Source",
  Industry: "Industry",
  "Assigned User": "Assigned User",
  Job: "Job",
  Location: "Location",
  Linkedin: "Linkedin",
};

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
  geoPythonExecFile,
};

