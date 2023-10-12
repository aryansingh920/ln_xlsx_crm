import { Request, Response } from "express";
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
  const columnNameToFind = "Name";
  let columnCells: string[] = [];
  try {
    columnCells = await getCellsForColumn(filePath, columnNameToFind);
  } catch (error) {
    console.error("Error:", error);
  }

  // console.log("Column Cells:", columnCells);

  for (let cell in columnCells) {
    if (
      _.trim(columnCells[cell]) !== "Name"
      // _.trim(columnCells[cell]) !== "Last Name" ||
      // _.trim(columnCells[cell]) !== "First Name"
    ) {
      console.log("Cell:", columnCells[cell]);
      const firstNameQuery = await FirstNameQuery(columnCells[cell]);
      const lastNameQuery = await LastNameQuery(columnCells[cell]);
      const fullNameQuery = await FullNameQuery(columnCells[cell]);

      console.log("First Name Query:", firstNameQuery);
      console.log("Last Name Query:", lastNameQuery);
      console.log("Full Name Query:", fullNameQuery);

      const firstNameResponse = await Chat_GPT_35_Chat(firstNameQuery);
      const lastNameResponse = await Chat_GPT_35_Chat(lastNameQuery);
      const fullNameResponse = await Chat_GPT_35_Chat(fullNameQuery);

      console.log(
        "First Name Response:",
        getStringsInsideDoubleQuotes(firstNameResponse.MPT)
      );
      console.log(
        "Last Name Response:",
        getStringsInsideDoubleQuotes(lastNameResponse.MPT)
      );
      console.log(
        "Full Name Response:",
        getStringsInsideDoubleQuotes(fullNameResponse.MPT)
      );

      console.log("----------------------------------------------");

      // console.log(
      //   await Chat_GPT_35_Chat(await FullNameQuery(columnCells[cell]))
      // );
      // console.log(
      //   await Chat_GPT_35_Conversation(await FirstNameQuery(columnCells[cell]))
      // );
      // console.log(
      //   await Chat_GPT_35_Conversation(await LastNameQuery(columnCells[cell]))
      // );
    }
  }

  // console.log("Company Names:", companyNames);
  //----------------------------------------------

  res.send(req.body);
};

export default {
  Changes,
};
