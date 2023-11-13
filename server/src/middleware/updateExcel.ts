import {
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
    await deleteDirectory(path.join(printCurrentDirectory(), "output"));

    await createDirectory(path.join(printCurrentDirectory(), "output"));

    let removeColumnArray: string[] = [];
    removeColumnArray = [...req.body.removeColumnArray];

    const inputFilePath = FilePath;
    const outputFilePath = OutputFilePath;

    await deleteColumn(
      pythonExecFile,
      PythonActions.DeleteColumnByName,
      inputFilePath,
      outputFilePath,
      removeColumnArray
    )
      .then(() => {
        console.log(`Columns ${""} deleted successfully.`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const filePath = outputFilePath;
    //Column Names
    const columnNames = await getColumnNames(filePath);
    //Excel File Path
    const excelFilePath = FilePath;

    for (const i of [
      findIndexByStringMatch(columnNames, "Name"),
      findIndexByStringMatch(columnNames, "First Name"),
      findIndexByStringMatch(columnNames, "Last Name"),
    ]) {
      // To Update Column 1,2,3

      let getColumnCells = await getCellsForColumn(
        excelFilePath,
        columnNames[i]
      );

      const updateColumnCells: string[] = [];

      //removing extra spaces and accents here
      for (const cell of getColumnCells) {
        updateColumnCells.push(removeExtraSpaces(formString(cell)));
      }

      const REChecker = extractNamesFullNameRE(updateColumnCells);
      // console.log("REChecker", REChecker);

      await updateColumnByName(
        pythonExecFile,
        PythonActions.UpdateColumnByName,
        OutputFilePath,
        OutputFilePath,
        columnNames[i],
        REChecker
      );
    }
    let getColumnCellsEmails = await getCellsForColumn(
      outputFilePath,
      columnNames[findIndexByStringMatch(columnNames, "Emails")]
    );
    let getColumnCellsCompany = await getCellsForColumn(
      outputFilePath,
      columnNames[findIndexByStringMatch(columnNames, "Company")]
    );
    let getColumnCellsName = await getCellsForColumn(
      outputFilePath,
      columnNames[findIndexByStringMatch(columnNames, "Name")]
    );
    let getColumnCellsFirstName = await getCellsForColumn(
      outputFilePath,
      columnNames[findIndexByStringMatch(columnNames, "First Name")]
    );
    let getColumnCellsLastName = await getCellsForColumn(
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

    // console.log("flattenObjects", flattenObjects);

    const EmailClearing: CompanyData = generateNewObject(flattenObjects);

    // console.log("EmailClearing", EmailClearing);

    let EmailName: { [key: string]: string } = {};
    for (let name in getColumnCellsName.slice(1)) {
      EmailName[getColumnCellsName.slice(1)[name]] = "";
    }
    const EmailNameObject = updateSecondObjectWithEmails(
      EmailClearing,
      EmailName
    );
    // console.log("EmailNameObject", EmailNameObject);
    // console.log("EmailName", EmailName);

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
        const gpt_Response: GPTInterface = await Chat_GPT_35_Conversation(
          query
        );
        console.log("gpt_Response", gpt_Response);
        const emailExtract = extractEmail(gpt_Response.MPT);
        EmailNameObject[employee.Name] = _.toLower(emailExtract!) || "";
        // EmailNameObject[employee.Name] = "";
      }

      console.log("----------------------------------------------------------");
    }

    //replacing in the excel sheet after response
    const EmailNameObjectValues: string[] = Object.values(EmailNameObject);
    // add Email keyword at 0th index of above array
    EmailNameObjectValues.unshift("Emails");

    await updateColumnByName(
      pythonExecFile,
      PythonActions.UpdateColumnByName,
      OutputFilePath,
      OutputFilePath,
      columnNames[findIndexByStringMatch(columnNames, "Emails")],
      EmailNameObjectValues
    );

    console.log("Updating Column Names");
    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      OutputFilePath,
      OutputFilePath,
      "Location",
      "Country"
    );
    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      OutputFilePath,
      OutputFilePath,
      "Job",
      "Title"
    );
    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      OutputFilePath,
      OutputFilePath,
      "Phones",
      "Phone"
    );
    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      OutputFilePath,
      OutputFilePath,
      "Emails",
      "Email"
    );

    res.status(200).json({ message: "File Updated" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export default {
  Changes,
};
