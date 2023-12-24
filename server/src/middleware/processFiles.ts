import { FileDirectoryPath, ProcessingDirectoryPath } from "../constants/constants";
import {
  Request,
  Response,
  path,
  ExcelJS,
  saveExcelFile,
  deleteFile,
  Constants,

  getColumnNames,
  getExcelFileDetails,
  _,
} from "../helper/imports";

//----------------------------------------------
//----------------------------------------------
//----------------------------------------------
//----------------------------------------------
//----------------------------------------------
//----------------------------------------------

const processFiles = async (req: Request, res: Response) => {
  try {
    // Delete the uploads directory
    // await deleteDirectory(path.join(printCurrentDirectory(), "uploads"));
    // Create a new uploads directory
    // await createDirectory(path.join(printCurrentDirectory(), "uploads"));

    console.log("In upload file middleware", req.file);
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
        // console.log("ProcessingDirectoryPath", ProcessingDirectoryPath);
        // console.log("req.file!.filename", req.file!.originalname);

        // console.log("ProcessingFilePath", ProcessingFilePath);cd
        // const outputFilePath = ""
        const outputFilePath = path.join(
          ProcessingDirectoryPath,
          req.file!.originalname
        );

        // Save the new workbook to the specified path
        return saveExcelFile(newWorkbook, outputFilePath);
      })
      .then(async () => {
        // Send a response indicating success or provide a download link

        //excel file path
        const excelFilePath = path.join(
          ProcessingDirectoryPath,
          req.file!.originalname
        );
        const excelFileDetails = await getExcelFileDetails(excelFilePath);
        const columnNames = await getColumnNames(excelFilePath);

        let toKeepArray: string[] = [];

        columnNames.forEach((element) => {
          // console.log("yo",Constants.Columns_To_Keep.includes(element),element);
          if (Constants.Columns_To_Keep.includes(element)) {
            toKeepArray.push(element);
          }
        });

        const uploadFilePath = path.join(
          FileDirectoryPath,
          req.file!.originalname
        );
        deleteFile(uploadFilePath);

        res.status(200).json({
          status: "success",

          fileName: req.file!.originalname,
          toKeepArray: toKeepArray,
          columnNames: columnNames,
          toRemoveArray: _.difference(columnNames, toKeepArray),
        });
      })
      .catch((error) => {
        console.error("Error loading Excel file:");
        // console.error("Buffer contents:", buffer.toString());
        res.status(500).render("404", {
          error: error.stack,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Server is not running", error: err });
  }
};


export default { processFiles };
// export { diskStorageUploadFile_post };
