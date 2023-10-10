import { Request, Response } from "express";
import {
  endsWithKeep,
  endsWithRemove,
} from "../utils/QueryExtract/keepOrRemove";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import { Constants, FilePath } from "../constants/constants";

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

  //   console.log("Remove Column Array", removeColumnArray);

  for (let columnName in removeColumnArray) {
    // console.log("Column Name", removeColumnArray[columnName]);
    const inputFilePath = FilePath; // Replace with the path to your input Excel file
    const outputFilePath = FilePath; // Replace with the path for the output Excel file
    const sheetName = Constants.SheetName; // Replace with the name of the sheet you want to modify
    // const co = 2; // Replace with the index of the column you want to delete
    await deleteColumn(
      inputFilePath,
      outputFilePath,
      sheetName,
      removeColumnArray[columnName]
    )
      .then(() => {
        console.log(`Column ${columnName} deleted successfully.`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  res.send(req.body);
};

export default {
  Changes,
};
