import { Request, Response, NextFunction } from "express";
import {
  BardAI,
  Conversation_gpt35,
  Bard_Palm2,
  Chat_GPT,
  Chat_GPT_35_Conversation,
  Chat_GPT_35_Chat,
  Chat_Llama_2,
} from "../utils/AIEngine";

// Define the middleware function
const AIMiddleware = async (req: Request, res: Response) => {
  try {
    // const translatedText = await translateTextToFrench(req.body.text);
    // console.log("Translated text: ", translatedText);

    console.log("Request body: ", req.body);

    // const query = `${req.body.text} , in this what is the first name , remove any accents present if any , and give the first name only in capitalized format`;
    const firstNameQuery = `What is the first name in the text "${req.body.text}" , remove All accents and keep first letter capital and in the response just give me the First name`;
    const lastNameQuery = `What is the last name in the text "${req.body.text}" , remove All accents and keep first letter capital and in the response just give me the Last name`;
    const fullNameQuery = `What is the full name in the text "${req.body.text}" , remove All accents and keep first letter capital and in the response just give me the Full name`;


    res.status(200).json("Printed to console");

    // Continue with the request-response cycle
  } catch (error) {
    // Handle errors, e.g., by sending an error response
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { AIMiddleware };
