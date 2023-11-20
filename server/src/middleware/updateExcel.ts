import { LastNameQuery } from "./../utils/QueryExtract/Name";
import { get } from "lodash";
import {
  updateExcelColumnNames,
  updatePhoneNumberArray,
  getUpdatedCountryArray,
  LlamaInterface,
  Chat_Llama_2,
  dataSetFilePath,
  appendStringToFile,
  ZeroBounceResponse,
  checkEmail,
  extractNames,
  CompanyData,
  Request,
  Response,
  deleteColumn,
  _,
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
  getRandomElement,
  updateColumnName,
  updateSecondObjectWithEmails,
  Constants,
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
  for (const i of [
    findIndexByStringMatch(columnNames, updateExcelColumnNames.Name),
  ]) {
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
      columnNames[
        findIndexByStringMatch(columnNames, updateExcelColumnNames.FirstName)
      ],
      firstName
    );

    await updateColumnByName(
      pythonExecFile,
      PythonActions.UpdateColumnByName,
      outputFilePath,
      outputFilePath,
      columnNames[
        findIndexByStringMatch(columnNames, updateExcelColumnNames.LastName)
      ],
      lastName
    );
  }

  const getColumnCellsCountry = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Location)
    ]
  );
  const updatedCountryArray = await getUpdatedCountryArray(
    getColumnCellsCountry.slice(1)
  );
  updatedCountryArray.unshift(updateExcelColumnNames.Location);
  // console.log("updatedCountryArray", updatedCountryArray);
  await updateColumnByName(
    pythonExecFile,
    PythonActions.UpdateColumnByName,
    outputFilePath,
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Location)
    ],
    updatedCountryArray
  );

  const getColumnCellsPhone = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Phones)
    ]
  );
  // console.log("getColumnCellsPhone", getColumnCellsPhone);
  const updatedPhoneArray = updatePhoneNumberArray(
    getColumnCellsPhone.slice(1)
  );
  // console.log("updatedPhoneArray", updatedPhoneArray);

  updatedPhoneArray.unshift(updateExcelColumnNames.Phones);
  // console.log("updatedPhoneArray", updatedPhoneArray);

  await updateColumnByName(
    pythonExecFile,
    PythonActions.UpdateColumnByName,
    outputFilePath,
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Phones)
    ],
    updatedPhoneArray
  );
};

const processEmailsAndNames = async (
  outputFilePath: string,
  columnNames: string[]
): Promise<void> => {
  const getColumnCellsEmails = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Emails)
    ]
  );

  const getColumnCellsCompany = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Company)
    ]
  );

  const getColumnCellsName = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Name)
    ]
  );

  const getColumnCellsFirstName = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.FirstName)
    ]
  );

  const getColumnCellsLastName = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.LastName)
    ]
  );

  const flattenObjects: CompanyData = flattenAndOrganize(
    getColumnCellsCompany.slice(1),
    getColumnCellsName.slice(1),
    getColumnCellsFirstName.slice(1),
    getColumnCellsLastName.slice(1),
    getColumnCellsEmails.slice(1)
  );

  console.log("flattenObjects", flattenObjects);

  const EmailClearing: CompanyData = generateNewObject(flattenObjects);

  console.log("EmailClearing", EmailClearing);

  let EmailName: { [key: string]: string } = {};
  for (let name in getColumnCellsName.slice(1)) {
    EmailName[getColumnCellsName.slice(1)[name]] = "";
  }

  console.log("EmailName", EmailName);

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
      // console.log("query", query);
      // const gpt_Response: GPTInterface = await Chat_GPT(query);
      const gpt_Response: LlamaInterface = await Chat_Llama_2(query);
      // console.log("gpt_Response", gpt_Response);

      const emailExtract = extractEmail(
        gpt_Response.LLAMA ? gpt_Response.LLAMA : ""
      );
      const emailExtractLower = _.toLower(emailExtract!);

      if (emailExtractLower !== "") {
        await checkEmail(emailExtractLower).then((res: ZeroBounceResponse) => {
          if (res.status === "valid") {
            console.log("valid email");
            appendStringToFile(dataSetFilePath.domainTxtFile, res.domain);
            // console.log(res);
            EmailNameObject[employee.Name] = emailExtractLower || "";
          } else {
            console.log("invalid email");
            // console.log(res);
            EmailNameObject[employee.Name] = "Email Invalid";
          }
        });
      } else {
        // console.log("invalid email");
        // console.log(res);
        EmailNameObject[employee.Name] = Constants.InvalidEmailMessage;
      }

      // console.log(emailVerify);
    }

    console.log("----------------------------------------------------------");
  }

  const EmailNameObjectValues: string[] = Object.values(EmailNameObject);
  EmailNameObjectValues.unshift(updateExcelColumnNames.Emails);

  await updateColumnByName(
    pythonExecFile,
    PythonActions.UpdateColumnByName,
    outputFilePath,
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Emails)
    ],
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
    updateExcelColumnNames.Location,
    updateExcelColumnNames.Country
  );
  await updateColumnName(
    pythonExecFile,
    PythonActions.UpdateColumnName,
    outputFilePath,
    outputFilePath,
    updateExcelColumnNames.Job,
    updateExcelColumnNames.Title
  );
  await updateColumnName(
    pythonExecFile,
    PythonActions.UpdateColumnName,
    outputFilePath,
    outputFilePath,
    updateExcelColumnNames.Phones,
    updateExcelColumnNames.Phone
  );
  await updateColumnName(
    pythonExecFile,
    PythonActions.UpdateColumnName,
    outputFilePath,
    outputFilePath,
    updateExcelColumnNames.Emails,
    updateExcelColumnNames.Email
  );

  res.status(200).json({ message: "File Updated" });
};
