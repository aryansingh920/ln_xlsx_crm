import { Request, Response } from "express";
import {
  endsWithKeep,
  endsWithRemove,
} from "../utils/QueryExtract/keepOrRemove";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import _ from "lodash";
import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";
import {
  FilePath,
  OutputFilePath,
  pythonExecFile,
  PythonActions,
} from "../constants/constants";
import {
  printCurrentDirectory,
  deleteDirectory,
  createDirectory,
} from "../utils/UpdateExcel/FolderManipulation";
import path from "path";
import { getCellsForColumn } from "../utils/ExcelManipulation/getCellsFromColumnNames";
import { formString } from "../utils/Accents/AccentChecker";
import { updateColumnByName } from "../utils/ExcelManipulation/updateColumnByColumnNames";
import { removeExtraSpaces } from "../utils/UpdateExcel/RemoveExtraSpace";
import { extractNamesFullNameRE } from "../utils/QueryExtract/FullNameRE";
import { findIndexByStringMatch } from "../utils/UpdateExcel/findIndexByStringMatch";
import { flattenAndOrganize } from "../utils/UpdateExcel/flattenObjects";
import { cleanAndFilterEmails } from "../utils/UpdateExcel/cleanAndFilterObjects";
import {
  generateNewObject,
  Employee,
  CompanyData,
} from "../utils/UpdateExcel/EmailMap";
//----------------------------------------------
//----------------------------------------------
//----------------------------------------------
//----------------------------------------------
//----------------------------------------------
//----------------------------------------------

const Changes = async (req: Request, res: Response) => {
  await deleteDirectory(path.join(printCurrentDirectory(), "output"));
  // Create a new uploads directory
  await createDirectory(path.join(printCurrentDirectory(), "output"));

  let removeColumnArray: string[] = [];
  for (let key in req.body) {
    if (endsWithKeep(key)) {
    }
    if (endsWithRemove(key)) {
      removeColumnArray.push(req.body[key]);
    }
  }

  const inputFilePath = FilePath;
  const outputFilePath = OutputFilePath;

  // Delete Column
  //----------------------------------------------
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

  //File Path
  //----------------------------------------------
  const filePath = outputFilePath;
  //Column Names
  const columnNames = await getColumnNames(filePath);
  //Excel File Path
  const excelFilePath = FilePath;

  // Get Cells From Column Names
  //----------------------------------------------
  // for (let i = 0; i < 3; i++) {
  for (const i of [
    findIndexByStringMatch(columnNames, "Name"),
    findIndexByStringMatch(columnNames, "First Name"),
    findIndexByStringMatch(columnNames, "Last Name"),
  ]) {
    // To Update Column 1,2,3

    let getColumnCells = await getCellsForColumn(excelFilePath, columnNames[i]);

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
  //Email Guessing and updating of email
  //----------------------------------------------

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

  //start array from 1 array[1:]

  const flattenObjects: CompanyData = await flattenAndOrganize(
    getColumnCellsCompany.slice(1),
    getColumnCellsName.slice(1),
    getColumnCellsFirstName.slice(1),
    getColumnCellsLastName.slice(1),
    getColumnCellsEmails.slice(1)
  );
  const EmailClearing: CompanyData = generateNewObject(flattenObjects);
  console.log("EmailClearing", EmailClearing);

  // ----------------------------------------------------------------------
  const file = `${OutputFilePath}`;
  res.json(EmailClearing);
  // res.download(file, Constants.FileName, function (err) {
  //   if (err) {
  //     // Handle error, but keep in mind the response may be partially-sent
  //     // so check res.headersSent
  //   } else {
  //     // decrement a download credit, etc.
  //   }
  // });
};

export default {
  Changes,
};
