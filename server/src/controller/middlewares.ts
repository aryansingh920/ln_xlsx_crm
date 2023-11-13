import Home from "../middleware/home";
import Upload from "../middleware/uploadFile";
import Changes from "../middleware/updateExcel";
import DownloadFile from "../middleware/downloadFile";

const middleware = { Home, Upload, Changes, DownloadFile };

export default middleware;
