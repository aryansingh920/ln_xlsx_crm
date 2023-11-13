import { CompanyData } from "./../utils/UpdateExcel/EmailMap";
import { Request, Response } from "express";
import { deleteColumn } from "../utils/ExcelManipulation/deleteColumn";
import _, { get } from "lodash";
import { getColumnNames } from "../utils/ExcelManipulation/getColumnNames";
import {
  FilePath,
  OutputFilePath,
  pythonExecFile,
  PythonActions,
} from "../constants/constants";
import {
  printCurrentDirectory,
  deleteDirectory,
  createDirectory,
} from "../utils/UpdateExcel/FolderManipulation";
import path from "path";
import { getCellsForColumn } from "../utils/ExcelManipulation/getCellsFromColumnNames";
import { formString } from "../utils/Accents/AccentChecker";
import { updateColumnByName } from "../utils/ExcelManipulation/updateColumnByColumnNames";
import { removeExtraSpaces } from "../utils/UpdateExcel/RemoveExtraSpace";
import { extractNamesFullNameRE } from "../utils/QueryExtract/FullNameRE";
import { findIndexByStringMatch } from "../utils/UpdateExcel/findIndexByStringMatch";
import { flattenAndOrganize } from "../utils/UpdateExcel/flattenObjects";
import {
  generateNewObject,
  filterEmployeesWithEmail,
  filterEmployeesWithOutEmail,
} from "../utils/UpdateExcel/EmailMap";
import {
  GetEmailQuery,
  SendEmailQuery,
  extractEmail,
} from "../utils/QueryExtract/Email";
import { Chat_GPT_35_Conversation, GPTInterface } from "../utils/AI/AIEngine";
import { getRandomElement } from "../utils/RandomElement";
import { updateColumnName } from "../utils/ExcelManipulation/updateColumnName";
import { updateSecondObjectWithEmails } from "../utils/UpdateExcel/updateSecondObjectWithEmails";
import ExcelJS from "exceljs";
import saveExcelFile from "../utils/ExcelManipulation/saveFile";
import { Constants } from "../constants/constants";
import { getExcelFileDetails } from "../utils/ExcelManipulation/getExcelFileDetails";

export {
  ExcelJS,
  saveExcelFile,
  getExcelFileDetails,
  Constants,
  CompanyData,
  Request,
  Response,
  deleteColumn,
  _,
  get,
  getColumnNames,
  FilePath,
  OutputFilePath,
  pythonExecFile,
  PythonActions,
  printCurrentDirectory,
  deleteDirectory,
  createDirectory,
  path,
  getCellsForColumn,
  formString,
  updateColumnByName,
  removeExtraSpaces,
  extractNamesFullNameRE,
  findIndexByStringMatch,
  flattenAndOrganize,
  generateNewObject,
  filterEmployeesWithEmail,
  filterEmployeesWithOutEmail,
  GetEmailQuery,
  SendEmailQuery,
  extractEmail,
  Chat_GPT_35_Conversation,
  GPTInterface,
  getRandomElement,
  updateColumnName,
  updateSecondObjectWithEmails,
};
