import { Request, Response } from "express";
import {
  endsWithKeep,
  endsWithRemove,
} from "../utils/QueryExtract/keepOrRemove";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import _ from "lodash";
import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";
import {
  Constants,
  FilePath,
  OutputFilePath,
  pythonExecFile,
  PythonActions,
} from "../constants/constants";
import {
  printCurrentDirectory,
  deleteDirectory,
  createDirectory,
} from "../utils/FolderManipulation";
import path from "path";
import { getCellsForColumn } from "../utils/ExcelManipulation/getCellsFromColumnNames";
import { formString } from "../utils/Accents/AccentChecker";
import { updateColumnByName } from "../utils/ExcelManipulation/updateColumnByColumnNames";
import { removeExtraSpaces } from "../utils/RemoveExtraSpace";
import { extractNamesFullNameRE } from "../utils/QueryExtract/FullNameRE";
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
  //----------------------------------------------

  // Get Cells From Column Names
  //----------------------------------------------
  const filePath = outputFilePath;

  const columnNames = await getColumnNames(filePath);

  const excelFilePath = FilePath;

  for (let i = 0; i < 3; i++) {
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
  const file = `${OutputFilePath}`;

  res.download(file, Constants.FileName, function (err) {
    if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
    } else {
      // decrement a download credit, etc.
    }
  });
};

export default {
  Changes,
};
