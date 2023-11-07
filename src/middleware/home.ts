import { Request, Response } from "express";

const home_get = (req: Request, res: Response) => {
  // res.render("home");
  res.status(200).json({ status: "Server is running" });
};

export default { home_get };
