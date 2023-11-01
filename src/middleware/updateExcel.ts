import e, { Request, Response } from "express";
import {
  endsWithKeep,
  endsWithRemove,
} from "../utils/QueryExtract/keepOrRemove";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import { Constants, FilePath, OutputFilePath } from "../constants/constants";
// import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";
import { getCellsForColumn } from "../utils/ExcelManipulation/getCellsFromColumnNames";
import {
  Chat_GPT_35_Conversation,
  Chat_GPT_35_Chat,
  Chat_GPT,
  Bard_Palm2,
  Chat_Llama_2,
  Question_Answer,
} from "../utils/AIEngine";
import {
  FirstNameQuery,
  LastNameQuery,
  FullNameQuery,
} from "../utils/QueryExtract/Name";
import _ from "lodash";
import { getStringsInsideDoubleQuotes } from "../utils/QueryExtract/StringInsideQuotes";
import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";

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


  const columnNames = await getColumnNames(filePath);

  console.log("Column Names:", columnNames);

  // let newNameArray: string[] = [];
  // let newFirstNameArray: string[] = [];
  // let newLastNameArray: string[] = [];

  // for (let i = 0; i <= 2; i++) {
  //   const columnNameToFind = columnNames[i];
  //   let columnCells: string[] = [];
  //   try {
  //     columnCells = await getCellsForColumn(filePath, columnNameToFind);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   for (let cell in columnCells) {
  //     if (_.trim(columnCells[cell]) !== columnCells[0]) {
  //       if (columnCells[0] === "Name") {
  //         let query = await FullNameQuery(columnCells[cell]);
  //         let response = await Chat_GPT_35_Chat(query);
  //         let name = getStringsInsideDoubleQuotes(response.MPT);
  //         newNameArray.push(name);
  //       } else if (columnCells[0] === "First Name") {
  //         let query = await FirstNameQuery(columnCells[cell]);
  //         let response = await Chat_GPT_35_Chat(query);
  //         let name = getStringsInsideDoubleQuotes(response.MPT);
  //         newFirstNameArray.push(name);
  //       } else if (columnCells[0] === "Last Name") {
  //         let query = await LastNameQuery(columnCells[cell]);
  //         let response = await Chat_GPT_35_Chat(query);
  //         let name = getStringsInsideDoubleQuotes(response.MPT);
  //         newLastNameArray.push(name);
  //       }
  //     }
  //   }
  // }

  // console.log("New Name Array:", newNameArray);
  // console.log("New First Name Array:", newFirstNameArray);
  // console.log("New Last Name Array:", newLastNameArray);

  // console.log("Company Names:", companyNames);
  //----------------------------------------------

  res.send(req.body);
};

export default {
  Changes,
};
