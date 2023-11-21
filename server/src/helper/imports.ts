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
import {
  Chat_GPT_35_Conversation,
  GPTInterface,
  Chat_Llama_2,
  Chat_GPT,
  Question_Answer,
  LlamaInterface,
} from "../utils/AI/AIEngine";
import { getRandomElement } from "../utils/RandomElement";
import { updateColumnName } from "../utils/ExcelManipulation/updateColumnName";
import { updateSecondObjectWithEmails } from "../utils/UpdateExcel/updateSecondObjectWithEmails";
import ExcelJS from "exceljs";
import saveExcelFile from "../utils/ExcelManipulation/saveFile";
import { Constants, dataSetFilePath } from "../constants/constants";
import { getExcelFileDetails } from "../utils/ExcelManipulation/getExcelFileDetails";
import { checkEmail } from "../utils/ZeroBounce/checkEmail";
import { appendStringToFile } from "../utils/txtFileUpload";
import { extractDomain } from "../utils/QueryExtract/EmailDomain";
import { ZeroBounceResponse } from "../utils/ZeroBounce/checkEmail";
import { extractNames } from "../utils/QueryExtract/extractNames";
import { getUpdatedCountryArray } from "../utils/QueryExtract/ReadCountry";
import { updatePhoneNumberArray } from "../utils/QueryExtract/extractPhoneNumbers";
import { updateExcelColumnNames } from "../constants/constants";
import { LastNameQuery } from "./../utils/QueryExtract/Name";

export {
  //interface
  ZeroBounceResponse,
  CompanyData,
  Request,
  Response,
  GPTInterface,
  LlamaInterface,

  // ---------------------------------------------------

  //string
  dataSetFilePath,
  Constants,
  FilePath,
  OutputFilePath,
  pythonExecFile,
  PythonActions,

  // ---------------------------------------------------

  //constants
  updateExcelColumnNames,

  // ---------------------------------------------------

  //function
  LastNameQuery,
  updatePhoneNumberArray,
  getUpdatedCountryArray,
  Question_Answer,
  Chat_GPT,
  Chat_Llama_2,
  extractNames,
  extractDomain,
  appendStringToFile,
  checkEmail,
  saveExcelFile,
  getExcelFileDetails,
  deleteColumn,
  get,
  getColumnNames,
  printCurrentDirectory,
  deleteDirectory,
  createDirectory,
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
  getRandomElement,
  updateColumnName,
  updateSecondObjectWithEmails,

  // ---------------------------------------------------

  //node_modules
  ExcelJS,
  _,
  path,

  // ---------------------------------------------------
};
