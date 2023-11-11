import Home from "../middleware/home";
import Upload from "../middleware/uploadFile";
import AIEngine from "../middleware/AIEngine";
import Changes from "../middleware/updateExcel"
import DownloadFile from "../middleware/downloadFile";

const middleware = { Home, Upload, AIEngine, Changes, DownloadFile };

export default middleware;