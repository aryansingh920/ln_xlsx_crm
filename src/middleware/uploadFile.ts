import { Request, Response } from "express";
import path from "path";
import ExcelJS from "exceljs";
import saveExcelFile from "../utils/ExcelManipulation/saveFile";
import {
  printCurrentDirectory,
  deleteDirectory,
  createDirectory,
} from "../utils/FolderManipulation";
import { Constants, FilePath } from "../constants/constants";
import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";
import { getExcelFileDetails } from "../utils/ExcelManipulation/getExcelFileDetails";
import _ from "lodash";



const uploadFile_post = async (req: Request, res: Response) => {
  // console.log("Path", printCurrentDirectory());

  // Delete the uploads directory
  await deleteDirectory(path.join(printCurrentDirectory(), "uploads"));
  // Create a new uploads directory
  await createDirectory(path.join(printCurrentDirectory(), "uploads"));

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const buffer = req.file.buffer;

  const workbook = new ExcelJS.Workbook();

  workbook.xlsx
    .load(buffer)
    .then((workbook) => {
      const worksheet = workbook.getWorksheet(1);

      const headers = worksheet.getRow(1).values as string[];
      const rows: any[] = [];

      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i).values;
        rows.push(row);
      }

      // Create a new Excel workbook
      const newWorkbook = new ExcelJS.Workbook();
      const newWorksheet = newWorkbook.addWorksheet(Constants.SheetName);

      // Add headers to the new worksheet
      newWorksheet.addRow(headers);

      // Add data rows to the new worksheet
      rows.forEach((row) => {
        newWorksheet.addRow(row);
      });

      // Define the output file path and name (change as needed)
      const outputFilePath = FilePath;

      // Save the new workbook to the specified path
      return saveExcelFile(newWorkbook, outputFilePath);
    })
    .then(async () => {
      // Send a response indicating success or provide a download link

      //excel file path
      const excelFilePath = FilePath;
      const excelFileDetails = await getExcelFileDetails(excelFilePath);
      const columnNames = await getColumnNames(excelFilePath);

      // console.log("Column Names:", columnNames);

      let toKeepArray: string[] = [];

      columnNames.forEach((element) => {
        // console.log(element);
        // console.log(Constants.Columns_To_Keep);
        if (Constants.Columns_To_Keep.includes(element)) {
          // console.log(element);
          toKeepArray.push(element);
        }
      });

      // console.log("File Details:", excelFileDetails);

      res.status(200).render("success", {
        msg: `Excel file saved as '${Constants.FileName}'`,
        excelFileDetails: excelFileDetails,
        toKeepArray: toKeepArray,
        columnNames: columnNames,
      });
    })
    .catch((error) => {
      console.error("Error loading Excel file:", error.message);
      console.error("Buffer contents:", buffer.toString());
      res.status(500).render("404", {
        error: error.stack,
      });
    });
};

export default { uploadFile_post };
