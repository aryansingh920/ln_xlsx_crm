import * as ExcelJS from "exceljs";

async function findCellsWithText(
  filePath: string,
  searchText: string
): Promise<{ row: number; col: number }[]> {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);

    const matchingCells: { row: number; col: number }[] = [];

    workbook.eachSheet((worksheet, sheetId) => {
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          if (cell.text.includes(searchText)) {
            matchingCells.push({ row: rowNumber, col: colNumber });
          }
        });
      });
    });

    return matchingCells;
  } catch (error) {
    throw error;
  }
}

const filePath = "path/to/your/excel-file.xlsx";
const searchText = "your search text";

findCellsWithText(filePath, searchText)
  .then((matchingCells) => {
    if (matchingCells.length === 0) {
      console.log("No matching cells found.");
    } else {
      console.log("Matching cells found:");
      matchingCells.forEach((cell) => {
        console.log(`Row: ${cell.row}, Column: ${cell.col}`);
      });
    }
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
