import { Request, Response, NextFunction } from "express";
import { BardAI } from "../utils/AIEngine";

// Define the middleware function
const AIMiddleware = async (req: Request, res: Response) => {
  try {
    // const translatedText = await translateTextToFrench(req.body.text);
    // console.log("Translated text: ", translatedText);

    const response = await BardAI(req.body.text);
    console.log("Response: ", response);
    res.status(200).json(response);

    // Continue with the request-response cycle
  } catch (error) {
    // Handle errors, e.g., by sending an error response
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { AIMiddleware };
