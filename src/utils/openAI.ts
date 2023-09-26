import { OpenAI } from "openai";

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function translateTextToFrench(text: string): Promise<string> {
  try {
    const response = await openaiClient.completions.create({
      model: "text-davinci-002",
      prompt: 'Translate the following English text to French: "' + text + '"',
      max_tokens: 60,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    throw error;
  }
}
