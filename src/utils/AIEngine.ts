import { OpenAI } from "openai";
import axios from "axios";

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function open_AI(text: string): Promise<string> {
  try {
    const response = await openaiClient.completions.create({
      model: "text-davinci-002",
      prompt: text,
      max_tokens: 60,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    throw error;
  }
}

export async function BardAI(query: String): Promise<void> {
  const PSID_cookie_value = process.env.BARD_1PSID_cookie_value;
  const PSIDTS_cookie_value = process.env.BARD_1PSIDTS_cookie_value;
  const PSIDCC_cookie_value = process.env.BARD_1PSIDCC_cookie_value;

  console.log(
    "All Keys Read",
    PSID_cookie_value,
    PSIDTS_cookie_value,
    PSIDCC_cookie_value,
    process.env.RAPID_API_KEY_VALUE
  );

  const options = {
    method: "GET",
    url: "https://bard1.p.rapidapi.com/ask",
    params: {
      question: query,
      "bard___Secure-1PSID_cookie_value": PSID_cookie_value,
      "bard___Secure-1PSIDTS_cookie_value": PSIDTS_cookie_value,
      "bard___Secure-1PSIDCC_cookie_value": PSIDCC_cookie_value,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "bard1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Conversation_gpt35(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationgpt35",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      web_access: false,
      stream: false,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Bard_Palm2(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationpalm2",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_GPT(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationgpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_GPT_35_Conversation(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationmpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      web_access: false,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_GPT_35_Chat(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/chatmpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: { message: query },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_Llama_2(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/chatllama",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: { message: query },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
