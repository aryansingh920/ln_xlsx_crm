import { Request, Response } from "express";
import {
  endsWithKeep,
  endsWithRemove,
} from "../utils/QueryExtract/keepOrRemove";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import { Constants, FilePath, OutputFilePath } from "../constants/constants";
// import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";
import {getCellsForColumn} from "../utils/ExcelManipulation/getCellsFromColumnNames";
import {
  Chat_GPT_35_Conversation,
  Chat_GPT_35_Chat,
  Chat_GPT,
} from "../utils/AIEngine";
import {
  FirstNameQuery,
  LastNameQuery,
  FullNameQuery,
} from "../utils/QueryExtract/LastName";

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
  let columnCells: string[] = [];
  try {
    columnCells = await getCellsForColumn(filePath, columnNameToFind);
  } catch (error) {
    console.error("Error:", error);
  }

  // console.log("Column Cells:", columnCells);

  for (let cell in columnCells) {
    if (
      columnCells[cell] !== "Name" ||
      columnCells[cell] !== "Last Name" ||
      columnCells[cell] !== "First Name"
    ) {
      console.log("Cell:", columnCells[cell]);
      console.log(
        await Chat_GPT_35_Chat(await FullNameQuery(columnCells[cell]))
      );
      console.log(
        await Chat_GPT_35_Conversation(await FirstNameQuery(columnCells[cell]))
      );
      console.log(
        await Chat_GPT_35_Conversation(await LastNameQuery(columnCells[cell]))
      );
    }
  }

  // console.log("Company Names:", companyNames);
  //----------------------------------------------

  res.send(req.body);
};

export default {
  Changes,
};
