import { Request, Response } from "express";
import {
  endsWithKeep,
  endsWithRemove,
} from "../utils/QueryExtract/keepOrRemove";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import { Constants, FilePath, OutputFilePath } from "../constants/constants";

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

  await deleteColumn(
    inputFilePath,
    outputFilePath,
    sheetName,
    removeColumnArray
  )
    .then(() => {
      console.log(`Column ${""} deleted successfully.`);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // }

  res.send(req.body);
};

export default {
  Changes,
};
