import {
  extractNames,
  CompanyData,
  Request,
  Response,
  deleteColumn,
  _,
  get,
  getColumnNames,
  FilePath,
  OutputFilePath,
  pythonExecFile,
  PythonActions,
  printCurrentDirectory,
  deleteDirectory,
  createDirectory,
  path,
  getCellsForColumn,
  formString,
  updateColumnByName,
  removeExtraSpaces,
  extractNamesFullNameRE,
  findIndexByStringMatch,
  flattenAndOrganize,
  generateNewObject,
  filterEmployeesWithEmail,
  filterEmployeesWithOutEmail,
  GetEmailQuery,
  SendEmailQuery,
  extractEmail,
  Chat_GPT_35_Conversation,
  GPTInterface,
  getRandomElement,
  updateColumnName,
  updateSecondObjectWithEmails,
} from "../helper/imports";

//----------------------------------------------

const Changes = async (req: Request, res: Response) => {
  try {
    await deleteAndCreateDirectory();

    let removeColumnArray: string[] = [...req.body.removeColumnArray];
    const inputFilePath = FilePath;
    const outputFilePath = OutputFilePath;

    await deleteColumnsAndUpdate(
      removeColumnArray,
      inputFilePath,
      outputFilePath
    );

    const columnNames = await getColumnNames(outputFilePath);
    const excelFilePath = FilePath;

    await processColumnsAndUpdate(columnNames, excelFilePath, outputFilePath);
    await processEmailsAndNames(outputFilePath, columnNames);
    await updateColumnNamesAndRespond(outputFilePath, columnNames, res);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export default {
  Changes,
};


//helper functions

const deleteAndCreateDirectory = async (): Promise<void> => {
  await deleteDirectory(path.join(printCurrentDirectory(), "output"));
  await createDirectory(path.join(printCurrentDirectory(), "output"));
};

const deleteColumnsAndUpdate = async (
  removeColumnArray: string[],
  inputFilePath: string,
  outputFilePath: string
): Promise<void> => {
  try {
    await deleteColumn(
      pythonExecFile,
      PythonActions.DeleteColumnByName,
      inputFilePath,
      outputFilePath,
      removeColumnArray
    );

    console.log(`Columns ${""} deleted successfully.`);
  } catch (error) {
    console.error("Error:", error);
  }
};

const processColumnsAndUpdate = async (
  columnNames: string[],
  excelFilePath: string,
  outputFilePath: string
): Promise<void> => {
  for (const i of [findIndexByStringMatch(columnNames, "Name")]) {
    const columnName = columnNames[i];

    const getColumnCells = await getCellsForColumn(excelFilePath, columnName);

    const updateColumnCells = getColumnCells.map((cell) =>
      removeExtraSpaces(formString(cell))
    );

    const REChecker = extractNamesFullNameRE(updateColumnCells);
    const { firstName, lastName } = extractNames(REChecker);

    await updateColumnByName(
      pythonExecFile,
      PythonActions.UpdateColumnByName,
      outputFilePath,
      outputFilePath,
      columnName,
      REChecker
    );

    await updateColumnByName(
      pythonExecFile,
      PythonActions.UpdateColumnByName,
      outputFilePath,
      outputFilePath,
      columnNames[findIndexByStringMatch(columnNames, "First Name")],
      firstName
    );

    await updateColumnByName(
      pythonExecFile,
      PythonActions.UpdateColumnByName,
      outputFilePath,
      outputFilePath,
      columnNames[findIndexByStringMatch(columnNames, "Last Name")],
      lastName
    );
  }
};

const processEmailsAndNames = async (
  outputFilePath: string,
  columnNames: string[]
): Promise<void> => {
  const getColumnCellsEmails = await getCellsForColumn(
    outputFilePath,
    columnNames[findIndexByStringMatch(columnNames, "Emails")]
  );

  const getColumnCellsCompany = await getCellsForColumn(
    outputFilePath,
    columnNames[findIndexByStringMatch(columnNames, "Company")]
  );

  const getColumnCellsName = await getCellsForColumn(
    outputFilePath,
    columnNames[findIndexByStringMatch(columnNames, "Name")]
  );

  const getColumnCellsFirstName = await getCellsForColumn(
    outputFilePath,
    columnNames[findIndexByStringMatch(columnNames, "First Name")]
  );

  const getColumnCellsLastName = await getCellsForColumn(
    outputFilePath,
    columnNames[findIndexByStringMatch(columnNames, "Last Name")]
  );

  const flattenObjects: CompanyData = flattenAndOrganize(
    getColumnCellsCompany.slice(1),
    getColumnCellsName.slice(1),
    getColumnCellsFirstName.slice(1),
    getColumnCellsLastName.slice(1),
    getColumnCellsEmails.slice(1)
  );

  const EmailClearing: CompanyData = generateNewObject(flattenObjects);

  let EmailName: { [key: string]: string } = {};
  for (let name in getColumnCellsName.slice(1)) {
    EmailName[getColumnCellsName.slice(1)[name]] = "";
  }

  const EmailNameObject = updateSecondObjectWithEmails(
    EmailClearing,
    EmailName
  );

  for (let companyName in EmailClearing) {
    console.log("----------------------------------------------------------");
    console.log("companyName", companyName);
    const EmployeeObjectWithEmail = filterEmployeesWithEmail(
      EmailClearing,
      companyName
    );
    const EmployeeObjectWithoutEmail = filterEmployeesWithOutEmail(
      EmailClearing,
      companyName
    );

    const randomElementWithEmail = getRandomElement(
      EmployeeObjectWithEmail[companyName]
    );
    const randomElementWithEmail2 = getRandomElement(
      EmployeeObjectWithEmail[companyName]
    );

    const randomElementQuery: string = SendEmailQuery(
      randomElementWithEmail?.Name || "",
      randomElementWithEmail?.["First Name"] || "",
      randomElementWithEmail?.["Last Name"] || "",
      companyName,
      randomElementWithEmail?.Email || [""]
    );
    const randomElementQuery2: string = SendEmailQuery(
      randomElementWithEmail2?.Name || "",
      randomElementWithEmail2?.["First Name"] || "",
      randomElementWithEmail2?.["Last Name"] || "",
      companyName,
      randomElementWithEmail2?.Email || [""]
    );

    for (let employee of EmployeeObjectWithoutEmail[companyName]) {
      const getEmailQuery: string = GetEmailQuery(
        employee.Name,
        employee["First Name"],
        employee["Last Name"],
        companyName
      );
      const query = `${randomElementQuery} and ${randomElementQuery2} so ${getEmailQuery} just give the email and no conversational text required no extra punctuation needed`;
      const gpt_Response: GPTInterface = await Chat_GPT_35_Conversation(query);
      console.log("gpt_Response", gpt_Response);

      const emailExtract = extractEmail(gpt_Response.MPT);
      EmailNameObject[employee.Name] = _.toLower(emailExtract!) || "";
    }

    console.log("----------------------------------------------------------");
  }

  const EmailNameObjectValues: string[] = Object.values(EmailNameObject);
  EmailNameObjectValues.unshift("Emails");

  await updateColumnByName(
    pythonExecFile,
    PythonActions.UpdateColumnByName,
    outputFilePath,
    outputFilePath,
    columnNames[findIndexByStringMatch(columnNames, "Emails")],
    EmailNameObjectValues
  );
};

const updateColumnNamesAndRespond = async (
  outputFilePath: string,
  columnNames: string[],
  res: Response
): Promise<void> => {
  console.log("Updating Column Names");
  await updateColumnName(
    pythonExecFile,
    PythonActions.UpdateColumnName,
    outputFilePath,
    outputFilePath,
    "Location",
    "Country"
  );
  await updateColumnName(
    pythonExecFile,
    PythonActions.UpdateColumnName,
    outputFilePath,
    outputFilePath,
    "Job",
    "Title"
  );
  await updateColumnName(
    pythonExecFile,
    PythonActions.UpdateColumnName,
    outputFilePath,
    outputFilePath,
    "Phones",
    "Phone"
  );
  await updateColumnName(
    pythonExecFile,
    PythonActions.UpdateColumnName,
    outputFilePath,
    outputFilePath,
    "Emails",
    "Email"
  );

  res.status(200).json({ message: "File Updated" });
};

