import {
  Request,
  Response,
  // checkEmail,
  // appendStringToFile,
  // extractDomain,
  // dataSetFilePath,
  // ZeroBounceResponse,
} from "../helper/imports";

const home_get = async (req: Request, res: Response) => {
  try {

    res.status(200).json({ status: "Server is running" });
  } catch (err) {
    res.status(500).json({ status: "Server is not running", error: err });
  }
};

export default { home_get };
