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
    // await checkEmail("yoyoaryan920@gmail.com").then(
    //   (res: ZeroBounceResponse) => {
    //     appendStringToFile(dataSetFilePath.domainTxtFile, res.domain);
    //     console.log(res);
    //   }
    // );
    // console.log(emailVerify);
    res.status(200).json({ status: "Server is running" });
  } catch (err) {
    res.status(500).json({ status: "Server is not running", error: err });
  }
};

export default { home_get };
