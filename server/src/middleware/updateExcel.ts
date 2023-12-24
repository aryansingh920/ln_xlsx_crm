import {
  ProcessingDirectoryPath,
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
  // ProcessingFilePath,
  OutputDirectoryPath,
  deleteFile,
  Constants,
} from "../helper/imports";

//----------------------------------------------

const Changes = async (req: Request, res: Response) => {
  try {
    // await deleteAndCreateDirectory();

    // console.log("req.body", req.body);

    if (!req.body.removeColumnArray || !req.body.fileName)
      return res.status(400).json({ message: "Bad Request" });

    let removeColumnArray: string[] = [...req.body.removeColumnArray];
    let fileName = req.body.fileName;

    const inputFilePath = path.join(ProcessingDirectoryPath, fileName);
    const outputFilePath = path.join(OutputDirectoryPath, fileName);

    // console.log("inputFilePath", inputFilePath);
    // console.log("outputFilePath", outputFilePath);

    await deleteColumnsAndUpdate(
      removeColumnArray,
      inputFilePath,
      inputFilePath
    );

    const columnNames = await getColumnNames(inputFilePath);

    // console.log("columnNames Here Routes", columnNames);
    const excelFilePath = inputFilePath;

    await processColumnsAndUpdate(columnNames, excelFilePath, inputFilePath);
    // console.log("Came Here");
    await processEmailsAndNames(inputFilePath, columnNames);

    //response sent here
    await updateColumnNamesAndRespond(
      inputFilePath,
      outputFilePath,
      columnNames,
      res,
      fileName
    );
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export default {
  Changes,
};

//helper functions

// const deleteAndCreateDirectory = async (): Promise<void> => {
//   await deleteDirectory(path.join(printCurrentDirectory(), "output"));
//   await createDirectory(path.join(printCurrentDirectory(), "output"));
// };

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
    console.error("Error: in updating columns", error);
  }
};

const processColumnsAndUpdate = async (
  columnNames: string[],
  excelFilePath: string,
  outputFilePath: string
): Promise<void> => {
  try {
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
    // console.log("getColumnCellsCountry", getColumnCellsCountry);
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

    console.log("Process Columns and Updated with names,email,phone,country");
  } catch (err) {
    console.log(
      "Something went wrong while processing columns and updating with names,email,phone,country",
      err
    );
  }
};

const updateColumnNamesAndRespond = async (
  inputFilePath: string,
  outputFilePath: string,
  columnNames: string[],
  res: Response,
  fileName: string
): Promise<void> => {
  try {
    console.log("Updating Column Names");
    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      inputFilePath,
      inputFilePath,
      updateExcelColumnNames.Location,
      updateExcelColumnNames.Country
    );
    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      inputFilePath,
      inputFilePath,
      updateExcelColumnNames.Job,
      updateExcelColumnNames.Title
    );
    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      inputFilePath,
      inputFilePath,
      updateExcelColumnNames.Phones,
      updateExcelColumnNames.Phone
    );

    console.log("delete linkedin column");
    await deleteColumnsAndUpdate(
      [updateExcelColumnNames.Linkedin],
      inputFilePath,
      inputFilePath
    );

    await updateColumnName(
      pythonExecFile,
      PythonActions.UpdateColumnName,
      inputFilePath,
      outputFilePath,
      updateExcelColumnNames.Emails,
      updateExcelColumnNames.Email
    );

    console.log("Column Names Updated");
    deleteFile(inputFilePath);
    res.status(200).json({ message: "File Updated", fileName: fileName });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong while updating column names in last step",
      error: err,
    });
  }
};
