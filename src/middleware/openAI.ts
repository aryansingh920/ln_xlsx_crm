import { Request, Response, NextFunction } from "express";
import { translateTextToFrench } from "../utils/openAI";

// Define the middleware function
const openaiMiddleware = async (req: Request, res: Response) => {
  try {
    const translatedText = await translateTextToFrench(req.body.text);
    console.log("Translated text: ", translatedText);
    // Continue with the request-response cycle
  } catch (error) {
    // Handle errors, e.g., by sending an error response
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { openaiMiddleware };
