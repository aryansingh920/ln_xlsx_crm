import Home from "../middleware/home";
import Upload from "../middleware/uploadFile";
import AIEngine from "../middleware/AIEngine";
import Changes from "../middleware/updateExcel"

const middleware = { Home, Upload, AIEngine,Changes };

export default middleware;
