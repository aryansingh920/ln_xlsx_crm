import { Request, Response } from "express";
import {
  endsWithKeep,
  endsWithRemove,
} from "../utils/QueryExtract/keepOrRemove";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import { Constants, FilePath, OutputFilePath } from "../constants/constants";
// import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";
import {getCellsForColumn} from "../utils/ExcelManipulation/getCellsFromColumnNames";

const Changes = async (req: Request, res: Response) => {
  let removeColumnArray: string[] = [];
  for (let key in req.body) {
    if (endsWithKeep(key)) {
      //   console.log("Keep", key);
    }
    if (endsWithRemove(key)) {
      //   console.log("Remove", key);
      removeColumnArray.push(req.body[key]);
    }
  }
  const inputFilePath = FilePath;
  const outputFilePath = OutputFilePath;
  const sheetName = Constants.SheetName;

  // Delete Column
  //----------------------------------------------
  await deleteColumn(
    inputFilePath,
    outputFilePath,
    sheetName,
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
  const columnNameToFind = "Last Name";
  let companyNames: string[] = [];
  try {
    companyNames = await getCellsForColumn(filePath, columnNameToFind);
  } catch (error) {
    console.error("Error:", error);
  }
  console.log("Company Names:", companyNames);
  //----------------------------------------------

  res.send(req.body);
};

export default {
  Changes,
};
