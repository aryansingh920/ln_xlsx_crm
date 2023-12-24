import {
  fetchLinkedInProfileEmail,
  Conversation_gpt35,
  CompanyDataWithFilteredEmail,
  Employee,
  EmployeeWithFilteredEmail,
  guessEmail,
  EmailValidationResponse,
  extractDomain,
  Chat_GPT_35_Chat,
  getRandomElement,
  GetEmailPatternQuery,
  LastNameQuery,
  updateExcelColumnNames,
  updatePhoneNumberArray,
  getUpdatedCountryArray,
  LlamaInterface,
  Chat_Llama_2,
  Chat_GPT,
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
  getRandomElements,
  updateColumnName,
  updateSecondObjectWithEmails,
  Constants,
  GPTInterface,
} from "../../helper/imports";

export const processEmailsAndNames = async (
  outputFilePath: string,
  columnNames: string[]
): Promise<void> => {
  // console.log("Hereioh 1", columnNames);

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

  const getColumnCellsLinkedin = await getCellsForColumn(
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Linkedin)
    ]
  );

  // console.log(
  //   "Hereioh 2",
  //   columnNames,
  //   updateExcelColumnNames.Linkedin,
  //   findIndexByStringMatch(columnNames, updateExcelColumnNames.Linkedin),
  //   getColumnCellsLinkedin
  // );

  const flattenObjects: CompanyData = flattenAndOrganize(
    getColumnCellsCompany.slice(1),
    getColumnCellsName.slice(1),
    getColumnCellsFirstName.slice(1),
    getColumnCellsLastName.slice(1),
    getColumnCellsEmails.slice(1)
  );

  const EmailClearing: CompanyDataWithFilteredEmail =
    generateNewObject(flattenObjects);

  let EmailName: { [key: string]: string } = {};
  for (let name in getColumnCellsName.slice(1)) {
    EmailName[getColumnCellsName.slice(1)[name]] = "";
  }

  let EmailNameObject = updateSecondObjectWithEmails(EmailClearing, EmailName);

  for (let companyName in EmailClearing) {
    console.log("----------------------------------------------------------");

    const employeeWithEmail = filterEmployeesWithEmail(
      EmailClearing,
      companyName
    );
    const employeeWithoutEmail = filterEmployeesWithOutEmail(
      EmailClearing,
      companyName
    );

    if (employeeWithEmail[companyName].length > 0) {
      EmailNameObject = await case1(
        employeeWithEmail,
        employeeWithoutEmail,
        companyName,
        EmailNameObject
      );
      await updateFile(EmailNameObject, outputFilePath, columnNames);
    }

    if (employeeWithEmail[companyName].length > 0) {
      EmailNameObject = await case2(
        employeeWithEmail,
        companyName,
        EmailNameObject,
        employeeWithoutEmail
      );
      await updateFile(EmailNameObject, outputFilePath, columnNames);
    }

    // if (employeeWithEmail[companyName].length > 0) {
    //   EmailNameObject = await case3(
    //     employeeWithEmail,
    //     employeeWithoutEmail,
    //     companyName,
    //     getColumnCellsLinkedin.slice(1),
    //     EmailNameObject
    //   );
    //   await updateFile(EmailNameObject, outputFilePath, columnNames);
    // }

    console.log("----------------------------------------------------------");
  }
};

async function updateFile(
  EmailNameObject: { [key: string]: string },
  outputFilePath: string,
  columnNames: string[]
) {
  const EmailNameObjectValues: string[] = Object.values(EmailNameObject);
  EmailNameObjectValues.unshift(updateExcelColumnNames.Emails);

  console.log(
    "EmailNameObjectValues Finaleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    EmailNameObjectValues
  );

  return await updateColumnByName(
    pythonExecFile,
    PythonActions.UpdateColumnByName,
    outputFilePath,
    outputFilePath,
    columnNames[
      findIndexByStringMatch(columnNames, updateExcelColumnNames.Emails)
    ],
    EmailNameObjectValues
  )
    .then((res) => {
      console.log("updated file", res);
      return true;
    })
    .catch((err) => {
      console.log("error in updated file", err);
      return false;
    });
}

async function case1(
  EmployeeObjectWithEmail: CompanyDataWithFilteredEmail,
  EmployeeObjectWithoutEmail: CompanyDataWithFilteredEmail,
  companyName: string,
  EmailNameObject: { [key: string]: string }
): Promise<{ [key: string]: string }> {
  const randomEmployee: EmployeeWithFilteredEmail = getRandomElement(
    EmployeeObjectWithEmail[companyName]
  );
  const domain = extractDomain(randomEmployee.Email);
  for (let EmployeeWithoutEmail of EmployeeObjectWithoutEmail[companyName]) {
    if (
      EmployeeWithoutEmail["First Name"].length > 2 &&
      EmployeeWithoutEmail["Last Name"].length > 2
    ) {
      const emailGuess = await guessEmail(
        domain ? domain : "",
        EmployeeWithoutEmail["First Name"],
        EmployeeWithoutEmail["Last Name"]
      )
        .then((res: EmailValidationResponse) => {
          if (res.status === "valid") return res.email;
          else return "Email not guessed from zerobounce";
        })
        .catch((err) => {
          // console.log("err", err);
          return "Email not guessed from zerobounce";
        });
      // console.log("emailGuess", emailGuess);
      EmailNameObject[EmployeeWithoutEmail.Name] = emailGuess;
    }
  }

  return EmailNameObject;
}

async function case2(
  EmployeeObjectWithEmail: CompanyDataWithFilteredEmail,
  companyName: string,
  EmailNameObject: { [key: string]: string },
  EmployeeObjectWithoutEmail: CompanyDataWithFilteredEmail
): Promise<{ [key: string]: string }> {
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
    // console.log("EmailNameObject", EmailNameObject[employee.Name]);
    if (
      (EmailNameObject[employee.Name] !== "" &&
        EmailNameObject[employee.Name] !== "Email Invalid") ||
      EmailNameObject[employee.Name] !== "Email not guessed from zerobounce"
    ) {
      console.log(
        "Email Already Exists from this",
        EmailNameObject[employee.Name],
        "employee",
        employee.Name
      );
      continue;
    } else {
      const getEmailQuery: string = GetEmailQuery(
        employee.Name,
        employee["First Name"],
        employee["Last Name"],
        companyName
      );
      const query = `${randomElementQuery} and ${randomElementQuery2} so ${getEmailQuery} just give the email and no conversational text required no extra punctuation needed`;

      const gpt_Response: GPTInterface = await Conversation_gpt35(query);
      // console.log("gpt_Response", gpt_Response);

      const emailExtract = extractEmail(gpt_Response.result!);
      const emailExtractLower = _.toLower(emailExtract!);

      if (emailExtractLower !== "") {
        await checkEmail(emailExtractLower).then((res: ZeroBounceResponse) => {
          if (res.status !== "invalid") {
            // console.log("valid email");
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
        console.log("invalid email");
        // console.log(res);
        EmailNameObject[employee.Name] = "Email Invalid";
      }
      // console.log(emailVerify);
    }
  }

  return EmailNameObject;
}

async function case3(
  EmployeeObjectWithEmail: CompanyDataWithFilteredEmail,
  EmployeeObjectWithoutEmail: CompanyDataWithFilteredEmail,
  companyName: string,
  LinkedinList: string[],
  EmailNameObject: { [key: string]: string }
): Promise<{ [key: string]: string }> {
  console.log("case3");
  console.log("LinkedinList", LinkedinList);

  // for (let uri of LinkedinList)
  for (let i = 0; i <= 1; i++) {
    let uri = LinkedinList[i];
    console.log("uri", uri);
    const emailFromLinkedin = await fetchLinkedInProfileEmail(
      uri,
      "http://localhost:3001/api/your-webhook-endpoint"
    );
    console.log("emailFromLinkedin", emailFromLinkedin);
  }

  return EmailNameObject;
}

