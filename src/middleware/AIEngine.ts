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

    console.log("Query: ", firstNameQuery, lastNameQuery, fullNameQuery);
    console.log(
      "BardAI: ",
      await BardAI(firstNameQuery),
      await BardAI(lastNameQuery),
      await BardAI(fullNameQuery)
    );
    console.log(
      "Conversation_gpt35: ",
      await Conversation_gpt35(firstNameQuery),
      await Conversation_gpt35(lastNameQuery),
      await Conversation_gpt35(fullNameQuery)
    );
    console.log(
      "Bard_Palm2: ",
      await Bard_Palm2(firstNameQuery),
      await Bard_Palm2(lastNameQuery),
      await Bard_Palm2(fullNameQuery)
    );
    console.log(
      "Chat_GPT: ",
      await Chat_GPT(firstNameQuery),
      await Chat_GPT(lastNameQuery),
      await Chat_GPT(fullNameQuery)
    );
    console.log(
      "Chat_GPT_35_Conversation: ",
      await Chat_GPT_35_Conversation(firstNameQuery),
      await Chat_GPT_35_Conversation(lastNameQuery),
      await Chat_GPT_35_Conversation(fullNameQuery)
    );
    console.log(
      "Chat_GPT_35_Chat: ",
      await Chat_GPT_35_Chat(firstNameQuery),
      await Chat_GPT_35_Chat(lastNameQuery),
      await Chat_GPT_35_Chat(fullNameQuery)
    );
    console.log(
      "Chat_Llama_2: ",
      await Chat_Llama_2(firstNameQuery),
      await Chat_Llama_2(lastNameQuery),
      await Chat_Llama_2(fullNameQuery)
    );

    res.status(200).json("Printed to console");

    // Continue with the request-response cycle
  } catch (error) {
    // Handle errors, e.g., by sending an error response
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { AIMiddleware };
