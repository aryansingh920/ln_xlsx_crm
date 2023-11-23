import {
  updateExcelColumnNames,
  updatePhoneNumberArray,
  getUpdatedCountryArray,
  extractNames,
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
  updateColumnName,
  processEmailsAndNames,
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
