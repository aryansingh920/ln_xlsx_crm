import { Request, Response } from "express";

const home_get = (req: Request, res: Response) => {
  res.render("home");
};

export default { home_get };
