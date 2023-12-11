import Home from "../middleware/home";
import Process from "../middleware/processFiles";
import Changes from "../middleware/updateExcel";
import DownloadFile from "../middleware/downloadFile";
import UploadFiles from "../middleware/uploadFiles";

const middleware = { Home, UploadFiles,Process, Changes, DownloadFile };

export default middleware;
